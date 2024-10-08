import Image from "next/image";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/components/Home";

export default function IndexPage() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}
