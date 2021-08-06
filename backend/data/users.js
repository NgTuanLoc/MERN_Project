import bcryptjs from "bcryptjs";

const user = [
  {
    name: "Admin",
    password: bcryptjs.hashSync("123456", 10),
    email: "admin@gmail.com",
    isAdmin: true,
  },
  {
    name: "Nguyen Tuan Loc",
    password: bcryptjs.hashSync("123456", 10),
    email: "tuanloc2352000@gmail.com",
  },
  {
    name: "Nguyen Cong Phuong",
    password: bcryptjs.hashSync("123456", 10),
    email: "phuong@gmail.ocm",
  },
];

export default user;
