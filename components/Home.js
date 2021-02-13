import Image from "next/image";
import Link from "next/link";
import StickyNavbar from "../components/StickyNavbar";
import Footer from "../components/Footer";
import ListItem from "../components/ListItem";
import { useCallback, useState } from "react";
import FormItem from "./FormItem";
import Hero from "./Hero";
import VerticalItem from "./VerticalItem";

const Home = ({ firms, verticals, blogs }) => {
  return (
    <div className='color-background'>
      <StickyNavbar verticals={verticals} />
      <Hero />
      <div className='container'>
        <div>
          <div className='grid-5'>
            {verticals.map((vertical) => (
              <VerticalItem vertical={vertical} key={vertical.key} />
            ))}
          </div>
        </div>
        <div className='my-2'>
          <h3 className='lead text-secondary text-center'>
            Helping You Keep Your Guard Up
          </h3>
          <div className='grid-2 mx-6 p-3'>
            <div>
              <ul>
                <li>
                  <b>Paying Taxes?</b>
                  <br /> Read our guide on how you can save money on your bill.
                </li>
                <li>
                  <b>Planning Retirement?</b>
                  <br /> Get ahead of the game by making smarter money moves
                  with our step by step instructions.
                </li>
                <li>
                  <b>Fixing Your Credit?</b>
                  <br /> Whether you need help with debt relief or want to
                  explore loan options, we've got you covered.
                </li>
                <li>
                  <b>Building A Business?</b>
                  <br /> We know that the corner stone of every business
                  enterprise is managing the books, so we help you find the best
                  tools for accounting.{" "}
                </li>
              </ul>
            </div>
            <div>
              <Image
                src='/front1.jpg'
                alt='Wallet Warriors'
                height='400'
                width='300'
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
