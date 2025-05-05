import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CheckExisting } from 'src/model/model';
import * as bcrypt from 'bcrypt';
import { ResponseService } from 'src/model/response';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  contructor(
    private prismaService,
    private jwtService: JwtService,
    private  responseService:ResponseService,
    private emailService:MailerService , // Inject EmailService

  ){}
  private async verifyOtp(inputCode: string) {
    try {
      // Lấy mã OTP từ cơ sở dữ liệu
      const otpRecord = await this.prismaService.code.findFirst({
        where: { code: inputCode },
      });
  
      if (!otpRecord) {
        return responseSend('', "Mã OTP không hợp lệ hoặc đã hết hạn", 400);
      }
  
      // Kiểm tra xem mã OTP có hết hạn không (3 phút)
      const now = new Date();
      const otpCreatedAt = otpRecord.created_at;
      const expiryTime = new Date(otpCreatedAt);
      expiryTime.setMinutes(expiryTime.getMinutes() + 3); // Hết hạn sau 3 phút
  
      if (now > expiryTime) {
        // Nếu mã OTP đã hết hạn, xóa mã OTP khỏi cơ sở dữ liệu
        await this.prismaService.code.delete({
    where: { id: otpRecord.id },
        });
  
        return responseSend('', "Mã OTP đã hết hạn", 400);
      }
  
      // Kiểm tra mã OTP nhập vào có đúng không
      if (inputCode !== otpRecord.code) {
        return responseSend('', "Mã OTP không đúng", 400);
      }
  
      // Xóa mã OTP sau khi xác thực thành công
      await this.prismaService.code.delete({
        where: { id: otpRecord.id },
  
      });
  
      return responseSend('', 'Thành công', 200);
    } catch (error) {
      console.error(error);
      return responseSend('', 'Đã xảy ra lỗi', 500);
    }
  }
  private generateRandomString(length:number):string{
    let result:string="";
    const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength=characters.length;
    for(let i=0;i<=charactersLength;i++){
      result+=characters.charAt(Math.floor(Math.random()*charactersLength));

    }
    return result
  }
  private async generaToken(payload:any){
    const access_token=await this.JwtService.signAsync(payload)
    return {access_token}
  }
  async  sendVerificationEmail  (userEmail:string, userId:number)  {
    try {
      const token= await this.generaToken({id:userId});

      // Tạo token xác thực với userId
      const confirmationLink = `http://localhost:8000/auth/confirm-email?token=${token.access_token}`;
      const sendEmail= this.emailService
      .sendMail({
        to: userEmail, // list of receivers
        subject: 'Xác nhận tài khoản', // Subject line
        html: `
          <h1>Xác nhận tài khoản tài khoản của bạn</h1>
    <p>Chào bạn,</p>
      <a href=${confirmationLink}>Kích hoạt tài khoản</a>  `, // HTML body content
      })

      return sendEmail
    } catch (error) {
      console.error("Lỗi khi gửi email xác thực:", error);
    }
  };
  private async hashPassword(password:string){
    try {
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword
    } catch (error) {
      return error
    }

  }

  async register(fullName:string,email:string,password:string){
    try {
      const hashPassword:string=await this.hashPassword(password);
      const existingEmail=await this.prismaService.users.findFirst({
        where:{
          email,
        }

      })
      if(!existingEmail){
        return responseService(null,"Register is verify",200);

      }
      const registerUser=await this.prismaService.users.create({
        user_name:fullName,
        email,
        password,
        is_verified:false,

      })
      await this.sendVerificationEmail(registerUser.email,registerUser.id)  
      return responseService("","Bạn cần xác nhận tài khoản thông qua email",200)
    } catch (error) {
      
    }

  }

  async login(email:string,password:string){
      const user=await this.prismaService.user.findFrist({
        where:{
          email
        }
      })
      if(!user) return responseService('',"Tai khoan hoac mat khau khong ton tai",400);
      const isCheckPassword=await bcrypt.compare(password,user.password);
      if(!isCheckPassword) return responseSend('', "Không tồn tại email hoặc password", 400);
      if(user.isverify==false){
        const sendEmailToUser=await this.sendVerificationEmail(user.email,user.id);
        return responseSend("","Bạn cần xác nhận tài khoản thông qua email",400)};
        const token= await this.generaToken({id:user.id,email:user.email,role:user.role});
    
      
        return responseSend({
         
          ...token,
          
  
        }, 'Thành công', 200);
      }
      // 

      async verificationEmail(payload:{email:string}) {
        try {
          const {email}=payload
            const checkEmail = await this.prismaService.users.findUnique({ where: { email: email } });
            
            // Kiểm tra xem email có tồn tại không
            if (!checkEmail) {
                return responseSend('', "Không tồn tại email", 400); 
            }
    
            const code = this.generateRandomString(6);
            this.emailService
            .sendMail({
              to: email, // list of receivers
              subject: 'Nhập mã OTP', // Subject line
              html: `
                <h1>Nhập mã otp tài khoản của bạn</h1>
          <p>Chào bạn,</p>
            <b>Mã otp: ${code}</b>  `, // HTML body content
            })
            await this.prismaService.code.create({
              data:{
                user_id:checkEmail.id,
                code
              }
            })
            return responseSend(checkEmail, 'Thành công', 200);
        } catch (error) {
            console.error('Lỗi trong verificationEmail:', error);
            return responseSend('', 'Đã xảy ra lỗi, vui lòng thử lại sau', 500);
        }
    }
    async verifyCheckOTP(payload:{code:string}){
      try {
       const {code}=payload
       return this.verifyOtp(code);
      } catch (error) {
       console.log(error);
       
      }
     
     
       }
       // đổi password ở auth
       async changePasswordWithoutToken(payload){
         try {
           const {email,newPassword}=payload
           const checkEmail = await this.prismaService.users.findFirst({
             where: { email },
           });
       
           if (!checkEmail) {
             return responseSend( "", "Email không tồn tại", 404);
           }
       
           // Hash the new password using bcrypt
           const hashedPassword:string = await bcrypt.hash(newPassword, 10);
           
            // Cập nhật mật khẩu trong cơ sở dữ liệu
            await this.prismaService.users.update({
             where: { id: checkEmail.id },
             data: { password: hashedPassword },
           });
       
           // Return success response
           return responseSend( true, "Mật khẩu đã được cập nhật", 200);
         } catch (error) {
           
         }
       }
  }

