export default {
  async validate(context: any) {
    const { value } = await context.request.body();
    let errors = [];
    let status;
    if (!value) {
      context.response.status = 400; // Bad Request
      context.response.body = { error: "Please provide the required data" };
      return;
    }

    const fields = ["email", "password", "name"];

    for (let index = 0; index < fields.length; index++) {
      const element = fields[index];
      if (!element) {
        status = 422; // Unprocessable Request
        errors.push({ [element]: "${element} field is required" });
      }
    }
    if (status) {
      context.response.status = 422; // Unprocessable Request
      context.response.body = { errors };
      return false;
    }
    return value;
  },
  async validateLogin(context: any) {
    const { value } = await context.request.body();
    let errors = [];
    let status;
    if (!value) {
      context.response.status = 400; // Bad Request
      context.response.body = { error: "Please provide the required data" };
      return;
    }

    const fields = ["email", "password"];

    for (let index = 0; index < fields.length; index++) {
      const element = fields[index];
      if (!element) {
        status = 422; // Unprocessable Request
        errors.push({ [element]: "${element} field is required" });
      }
    }
    if (status) {
      context.response.status = 422; // Unprocessable Request
      context.response.body = { errors };
      return false;
    }
    return value;
  }
};
