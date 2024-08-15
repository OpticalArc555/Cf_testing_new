import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import WhatsApp from "/logos/WhatsApp.png";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ynmx3oj", "template_o3f0ufy", form.current, {
        publicKey: "E-s2TiiRkbTEwB44F",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <div className="flex justify-center mt-[3rem] mb-10 px-4">
      <Card className="w-full max-w-[50rem] p-5 shadow-lg">
        <CardBody className="mb-6 p-0">
          <Typography
            variant="h3"
            className="text-center flex justify-center items-center"
          >
            <img src={WhatsApp} alt="whats" className="w-8" /> Still in doubt?
            We are here to help you out!
          </Typography>
          <form ref={form} onSubmit={sendEmail}>
            <div className=" flex justify-center flex-col gap-3 items-center mt-10">
              <div className="w-72">
                <Input label="Name" type="text" name="to_name" />
              </div>
              <div className="w-72">
                <Input label="Number" type="number" name="message" />
              </div>
              <div className="w-72">
                <Input label="email" type="email" name="from_name" />
              </div>
              <div className="bg-orange-500 rounded-xl">
                <Input type="submit" value="Contactus" />
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactUs;
