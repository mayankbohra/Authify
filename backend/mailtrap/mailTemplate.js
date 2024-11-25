export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.8; color: #444; margin: 0; padding: 0; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 30px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #007BFF; padding: 20px; text-align: center; color: #fff;">
      <h1 style="margin: 0; font-size: 24px;">Welcome to Our Platform</h1>
    </div>
    <div style="padding: 20px; text-align: center;">
      <p style="margin: 0 0 20px;">Hello,</p>
      <p>Thank you for joining us! Please use the verification code below to activate your account:</p>
      <div style="background: #f1f8ff; padding: 15px; margin: 20px auto; font-size: 24px; font-weight: bold; color: #007BFF; letter-spacing: 4px; border-radius: 5px; width: fit-content;">
        {verificationCode}
      </div>
      <p>Make sure to enter this code within the next 15 minutes to complete your registration.</p>
    </div>
    <div style="background-color: #f3f4f6; padding: 10px 20px; text-align: center; font-size: 12px; color: #777;">
      <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.8; color: #444; margin: 0; padding: 0; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 30px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #28a745; padding: 20px; text-align: center; color: #fff;">
      <h1 style="margin: 0; font-size: 24px;">Password Reset Successful</h1>
    </div>
    <div style="padding: 20px; text-align: center;">
      <p style="margin: 0 0 20px;">Hello,</p>
      <p>Your password has been successfully reset.</p>
      <div style="margin: 20px auto;">
        <span style="display: inline-block; width: 50px; height: 50px; line-height: 50px; background: #28a745; color: white; border-radius: 50%; font-size: 24px;">✓</span>
      </div>
      <p>If you didn't reset your password, contact our support team immediately.</p>
    </div>
    <div style="background-color: #f3f4f6; padding: 10px 20px; text-align: center; font-size: 12px; color: #777;">
      <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.8; color: #444; margin: 0; padding: 0; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 30px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #FFC107; padding: 20px; text-align: center; color: #fff;">
      <h1 style="margin: 0; font-size: 24px;">Reset Your Password</h1>
    </div>
    <div style="padding: 20px; text-align: center;">
      <p style="margin: 0 0 20px;">Hello,</p>
      <p>We received a request to reset your password. Click the button below to proceed:</p>
      <a href="{resetURL}" style="display: inline-block; padding: 12px 20px; background: #FFC107; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      <p style="margin: 20px 0;">This link will expire in 1 hour for security reasons.</p>
    </div>
    <div style="background-color: #f3f4f6; padding: 10px 20px; text-align: center; font-size: 12px; color: #777;">
      <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
