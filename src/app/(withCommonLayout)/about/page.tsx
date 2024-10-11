import React from "react";

const AboutUs = () => {
  return (
    <div className="py-12 w-full">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center  mb-8">About Us</h1>

        {/* Mission Section */}
        <section className=" shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <h2 className="text-3xl font-semibold  mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            At Gardenbook, our mission is to empower gardening enthusiasts and
            professionals alike by providing a platform to share, learn, and
            connect. We believe that gardening is not just a hobby but a way of
            life that promotes sustainability, well-being, and community
            building.
          </p>
        </section>

        {/* Vision Section */}
        <section className=" shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <h2 className="text-3xl font-semibold  mb-4">Our Vision</h2>
          <p className=" leading-relaxed">
            Our vision is to create a global community of gardeners where
            knowledge flows freely, innovation thrives, and a deep love for
            nature is shared across borders. We aim to foster a space where
            beginners and experts alike can find the resources they need to grow
            their skills and their gardens.
          </p>
        </section>

        {/* Team Section */}
        <section className=" shadow-lg rounded-lg p-8 mb-10 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <h2 className="text-3xl font-semibold  mb-4">Meet the Team</h2>
          <div className="flex flex-wrap justify-around">
            <div className="team-member  rounded-lg p-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 mb-6 transition-transform transform hover:-translate-y-1 hover:shadow-md duration-300">
              <img
                src="https://res.cloudinary.com/dbwftcxvx/image/upload/v1725594532/CEO_dkpzsn.jpg"
                alt="Team Member 1"
                className="rounded-md w-52 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center ">John Doe</h3>
              <p className="text-center ">Founder & CEO</p>
            </div>
            <div className="team-member  rounded-lg p-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 mb-6 transition-transform transform hover:-translate-y-1 hover:shadow-md duration-300">
              <img
                src="https://res.cloudinary.com/dbwftcxvx/image/upload/v1725594532/Manager_yzjmjx.jpg"
                alt="Team Member 2"
                className="rounded-md w-52 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center ">Jane Smith</h3>
              <p className="text-center ">Lead Developer</p>
            </div>
            <div className="team-member  rounded-lg p-4 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 mb-6 transition-transform transform hover:-translate-y-1 hover:shadow-md duration-300">
              <img
                src="https://res.cloudinary.com/dbwftcxvx/image/upload/v1725594532/Reciptionist_aomtbm.jpg"
                alt="Team Member 3"
                className="rounded-md w-52 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center ">
                Alice Johnson
              </h3>
              <p className="text-center">Community Manager</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
