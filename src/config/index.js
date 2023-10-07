const {
  PORT,
  DB_URL,
  PRINCIPLE_MAIL,
  PRINCIPLE_PASS,
  PRINCIPLE_NUM,
  AUTH_KEY,
} = process?.env;

export const config = {
  db_url: DB_URL,
  email: {
    //node mailer
  },
  admin_cred: {
    PRINCIPLE_MAIL,
    PRINCIPLE_PASS,
    PRINCIPLE_NUM,
  },
  port: PORT,
  secret_key: AUTH_KEY,
};
