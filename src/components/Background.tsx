import Image from "next/image";

const Background = () => {
  return (
    <div className="flex flex-row relative max-w-[2000px] mx-auto px-6 lg:px-0">
      {/* Navigation bar */}
      <nav className="fixed bottom-0 w-full px-5 py-7 left-0 md:fixed md:bottom-0 lg:sticky lg:left-0 lg:top-0 lg:w-1/5 lg:h-screen bg-[#FAFAFA]">
        {/* nav elements */}
        <Image
          unoptimized={true}
          width={100}
          height={100}
          src="/images/logo.svg"
          alt="ehr logo"
          className="hidden lg:block mt-1"
        />
        <div className="flex flex-row justify-between lg:flex-col lg:mt-20">
          {/* profile */}
          <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start lg:flex-row lg:gap-2 lg:bg-bluestrong lg:py-5 md:px-4 rounded-md">
            {/* Mobile icon */}
            <Image
              unoptimized={true}
              width={100}
              height={100}
              src="/images/dashboard-icons/vuesax/linear/profile.svg"
              alt="profile icon"
              className="w-[100px] lg:hidden"
            />

            {/* web icon */}
            <Image
              unoptimized={true}
              width={100}
              height={100}
              src="/images/dashboard-icons/profile-icon-white.svg"
              alt="profile icon"
              className="hidden w-[100px] lg:block"
            />
          </div>
          {/* sms */}
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:space-x-2 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Image
              unoptimized={true}
              width={100}
              height={100}
              src="/images/dashboard-icons/vuesax/linear/sms.svg"
              alt="profile icon"
              className="w-[100px]"
            />
          </div>
          {/* jobs */}
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:space-x-2 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Image
              unoptimized={true}
              width={100}
              height={100}
              src="/images/dashboard-icons/vuesax/linear/briefcase.svg"
              alt="profile icon"
              className="w-[100px]"
            />
          </div>
          {/* courses */}
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:space-x-2 lg:justify-start lg:py-5 md:px-4 rounded-md">
            <Image
              unoptimized={true}
              width={100}
              height={100}
              src="/images/dashboard-icons/vuesax/linear/book.svg"
              alt="profile icon"
              className="w-[100px]"
            />
          </div>
          {/* contacts */}
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row lg:space-x-2 lg:justify-start lg:py-5 lg:px-4 rounded-md">
            <Image
              unoptimized={true}
              width={100}
              height={100}
              src="/images/dashboard-icons/vuesax/linear/people.svg"
              alt="profile icon"
              className="w-[100px]"
            />
          </div>
        </div>
      </nav>

      <section className="w-full lg:w-4/5 lg:px-14">
        {/* Header content */}
        {/* Left header content */}
        <div className="flex flex-row justify-between items-center mt-5">
          <div className="flex flex-col">
            <h3 className="text-2xl lg:text-4xl">
              Hello there, <span className="inline-block font-bold">Hauwa</span>
            </h3>
            <p className="text-sm max-w-[200px] mt-1 text-inactive md:max-w-md lg:text-base">
              Here is what is going on with your account today
            </p>
          </div>
          {/* Right header content */}
          <div className="flex flex-row justify-center items-center gap-3">
            <div className="hidden md:block">
              <div className="relative md:w-[200px] lg:w-80">
                <Image
                  unoptimized={true}
                  width={100}
                  height={100}
                  src="images/dashboard-icons/vuesax/linear/search-normal.svg"
                  alt=""
                  className="absolute w-6 h-6 top-5 left-4"
                />
                <input
                  type="text"
                  className="py-5 pl-14 pr-4 bg-[#F5F4F7] w-full rounded-md md:mr-5 truncate"
                  placeholder="Search for people, skills, or jobs"
                />
              </div>
            </div>
            <div className="relative">
              <a href="#" className="absolute top-3 left-3.5 text-inactive">
                HS
              </a>
              <button className="h-12 w-12 bg-inactive/30 rounded-full"></button>
            </div>
            <Image
              unoptimized={true}
              width={25}
              height={25}
              src="/images/dashboard-icons/vuesax/linear/arrow-down.svg"
              alt=""
              className="w-5"
            />
          </div>
        </div>

        {/* Body */}
        <div className="mt-12 lg:mt-16">
          {/* nav items */}
          <div className="flex flex-row justify-between md:justify-start md:gap-14">
            <div>
              <p className="text-sm md:text-base underline underline-offset-8">
                <a href="#">Overview</a>
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base text-inactive/60 hover:text-inactive/80">
                <a href="#">Profile</a>
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base text-inactive/60 hover:text-inactive/80">
                <a href="#">Resume</a>
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base text-inactive/60 hover:text-inactive/80">
                <a href="#">Preferences</a>
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base text-inactive/60 hover:text-inactive/80">
                <a href="#">Culture</a>
              </p>
            </div>
          </div>

          {/* content container*/}
          <section>
            {/* Content */}
            <div className="w-full mt-10 md:w-5/6 border border-[#ECECEC] rounded-md">
              <div className="bg-[#F0F4FF] px-5 py-8">
                {/* Progress bar */}
                <div className="bg-[#CCDBFB] h-1 rounded-full">
                  <div className="bg-[#004DE1] w-12 h-1 rounded-md"></div>
                </div>
                {/* Text elements under bar */}
                <div className="flex flex-row justify-between items-center mt-4">
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      unoptimized={true}
                      width={25}
                      height={25}
                      src="/images/dashboard-icons/profile-dash.svg"
                      alt=""
                    />
                    <p className="max-w-[290px] md:max-w-full">
                      Complete your profile to improve your chances of landing
                      that perfect job!
                    </p>
                  </div>
                  <p className="text-xs text-inactive/50 text-right">
                    5 steps to comlpete
                  </p>
                </div>
              </div>
            </div>
            {/* Button section*/}
            <div>
              <div className="px-5 pt-5 flex flex-col md:flex-row justify-between">
                <button className="primary-button px-4 mt-5 md:mt-0">
                  Update
                </button>
              </div>
              <div className="flex flex-row gap-12 mt-7 px-4 pb-8">
                <div className="flex flex-row items-center">
                  <Image
                    unoptimized={true}
                    width={25}
                    height={25}
                    src="/images/dashboard-icons/arrow-left.svg"
                    alt=""
                  />
                  <a href="#" className="text-inactive">
                    Previous
                  </a>
                </div>
                <div className="flex flex-row-revers items-center">
                  <a href="#" className="text-bluemedium">
                    Next
                  </a>
                  <Image
                    unoptimized={true}
                    width={25}
                    height={25}
                    src="/images/dashboard-icons/arrow-right.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Background;
