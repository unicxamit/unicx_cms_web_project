const VerifyEmail = ({ name, url }) => {
    return `
      <p>Dear ${name},</p>
      <p>Thank you for registering on our app.</p>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; color: white; background: blue; text-decoration: none; border-radius: 5px; margin-top: 15px;">Verify Email</a>
    `;
  };
  
  export default VerifyEmail;
  