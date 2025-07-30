import girl1 from "@/assets/images/girl1.jpg";
import girl2 from "@/assets/images/girl2.jpg";
import girl3 from "@/assets/images/girl3.jpg";
import logo from "@/assets/images/logo.png";
export const images = {
  // Add your dating-related images here
  girl1,
  girl2,
  girl3,
};
export const logoImage = {
   logo,
};

export const onboarding = [
  {
    id: 1,
    title: "The perfect match is just a tap away!",
    description:
      "Your journey begins with us. Find your ideal match effortlessly.",
    image: images.girl1,
  },
  {
    id: 2,
    title: "Best match in your hands with LoveLink",
    description:
      "Discover the excitement of finding your perfect partner today",
    image: images.girl2,
  },
  {
    id: 3,
    title: "Your match, your way. Let’s go!",
    description:
      "Enter your vibe, sit back, and let us take care of the rest.",
    image: images.girl3,
  },
];

export const data = {
  onboarding,
};
