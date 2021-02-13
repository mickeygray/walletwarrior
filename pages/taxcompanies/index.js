import StickyNavbar from "../../components/StickyNavbar";
import Image from "next/image";
import Footer from "../../components/Footer";
import path from "path";
import fs from "fs";
import { useAppContext } from "../../contexts/state.js";
import fetch from "isomorphic-fetch";
const TaxCompanies = ({ verticals }) => {
  const { addClick } = useAppContext();

  if (process.browser) {
    window.onbeforeunload = () => {
      const lead = JSON.parse(sessionStorage.getItem("lead"));
      const clicks = JSON.parse(sessionStorage.getItem("click"));
      const ip = JSON.parse(sessionStorage.getItem("ip"));

      const packet = { lead, clicks, ip };

      sessionStorage.clear();
      fetch("/api/lookup", {
        method: "post",
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packet),
        keepalive: true,
      }).then((res) => {
        res.status === 200 ? console.log("gotcha!") : "";
      });
    };
  }
  return (
    <div className='color-background'>
      <StickyNavbar verticals={verticals[0]} />
      <div className='container'>
        <h3>
          Ten Questions to Ask When Finding the CPA, Tax Preparer or Attorney
          That is Best For You
        </h3>

        <div className='grid-2'>
          <div>
            {" "}
            Since it is our mission to provide you with excellent CPAs and Tax
            attorneys that serve your area. We decided to take a moment to
            review some of our thoughts on what to look for in a CPA and how to
            figure out the right firm for you.{" "}
          </div>
          <div>
            {" "}
            <Image
              src='/findinghead.jpg'
              alt='find best cpa or tax attorney'
              height='200px'
              width='400px'
            />
          </div>
        </div>
        <br></br>
        <br />
        <div>
          <div>
            <h4>#1) What are your current tax and accounting issues? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              While this is somewhat of an obvious question, if you don't have a
              right frame of reference on your tax and accounting needs you are
              bound to not make best choice. So how big are your problems? If
              the answer is bigger than you can manage maybe you would be better
              served by a larger firm, if you have a small simple return then
              there are serveral tax preparers with more modest fees.{" "}
            </p>
          </div>
          <div className='all-center'>
            {" "}
            <Image
              src='/finding1.jpg'
              alt='find best cpa or tax attorney'
              height='300px'
              width='600px'
            />
          </div>
        </div>
        <br></br>
        <br />
        <div className='grid-2'>
          <div>
            {" "}
            <Image
              src='/finding2.png'
              alt='find best cpa or tax attorney'
              height='200px'
              width='400px'
            />
          </div>
          <div>
            <h4>#2) Do You Owe Money To The IRS? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              There are two primary forms of tax debt, state and federal.
              Federal tax debt is accrued from not filing or paying the proper
              amount in tax to the Internal Revenue Service. If you are
              currently looking for an accountant, tax preparer or tax attorney
              because you owe money to the IRS, it is import that you know a few
              things. Most importantly is that filing is the number one issue if
              you have not already done so. While filing back years can be done
              with smaller firms, larger balance negotiations done with the IRS
              are usually best left to tax attorneys who specialize in this sort
              of negotiation which can be found at any of the large national
              firms on CPANearMe.com.{" "}
            </p>
          </div>
        </div>
        <br></br>
        <br />
        <div className='grid-2c'>
          <div>
            <h4>#3) Do You Owe Money To The State? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              Oweing money to the state can be a very complicated issue,
              primarily because reaching a state agent is not nearly as reliably
              fast as reaching someone who works for the IRS, not to mention the
              myriad of differences in programs offered by each state, means
              that if you are behind on your state taxes, it is important to
              know what your rights and responsibilities are. While you will
              have an opportunity to save some money on your path to
              reconcilliation with the state, often it is by structuring a deal
              with the state to eliminate available income that larger firms
              will approach a Federal Debt Relief initiative. If you only owe
              state taxes, maybe calling a local office to set up a payment plan
              is best.{" "}
            </p>
          </div>
          <div>
            {" "}
            <Image
              src='/finding3.jpg'
              alt='find best cpa or tax attorney'
              height='300px'
              width='300px'
            />
          </div>
        </div>
        <br></br>
        <br />
        <div className=''>
          <h4>#4) How Much Total Debt Do You Have? </h4>
          <br />
          <p style={{ textIndent: "25px" }}>
            {" "}
            Owing the government in excess of $10,000 dollars can seem like an
            insurmountable and fundamentally life ruining hardship. Especially
            because as your debt increases the pressure tactics the state and
            federal government uses to get the money owed increases. People all
            around the United States have horror stories of wage garnishments
            and bank levys while trying to manage and survive. Sometimes without
            proper representation, if you are approached by the state or federal
            government and they demand you enter into a payment arrangement with
            them, often they will not take any of your personal circumstances
            into consideration unless you correctly present them to them in
            documentation that needs to be filed by a legal professional. So if
            your wages are being garnished, if the IRS has taken money out of
            your bank account, NOW is the time to get professional legal help in
            the act of recovering already taken money and reducing the amount of
            money they take going forward. Letting a tax attorney or enrolled
            agent structure your deal with IRS will save you a great deal of
            time stress and money.{" "}
          </p>
        </div>
        <br />
        <div className='all-center'>
          {" "}
          <Image
            src='/finding4.jpg'
            alt='find best cpa or tax attorney'
            height='300px'
            width='600px'
          />
        </div>
        <br />
        <div className='grid-2'>
          <div>
            <h4>#5) Are you a single person or do you own a business? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              Personal tax debt can be an overwhelming and life threatening
              ordeal, but if your business is going under then the amount at
              stake just grows exponentially depending on how many people it
              effects. So the time to start dealing with your debt is now, and
              fortunately the CPAs and tax attorneys at CPANearMe.com have
              recommendations next to them for whether or not they are best
              suited for the individual or a business. While many large firms
              are great for both businesses and individuals knowing what the tax
              firm you'd like to have represent you specializes in is important.
              That's why we provide our in depth analysis on the companies who
              are our partners.{" "}
            </p>
          </div>
          <div>
            <Image
              src='/finding5.png'
              alt='find best cpa or tax attorney'
              height='300px'
              width='600px'
            />
          </div>
        </div>
        <br></br>
        <br />
        <div className='grid-2c'>
          <div>
            <h4>#6) When was the last time you filed your taxes? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              When people know they are going to owe money when they file,
              sometimes they come up with a very peculiar idea. If I don't file
              my taxes, I don't have to pay or deal with my taxes. WRONG! Its is
              a criminal act to not file a personal federal tax return if you
              have a qualifying amount of income or are not declared as someones
              dependent. So if you've been hiding from your problems by closing
              your eyes and sticking your fingers in your ears, that has to stop
              today, or you could lose everything. Filing your taxes must be
              your first priority before you seek any sort of balance reduction
              or debt forgiveness or payment plan considerations. If you have
              years and years of unfiled returns and no sense of how to start,
              you may be better served by a larger firm who is capable of filing
              forensic tax returns based on your information obtained from the
              IRS directly. If you have only a few years to file, maybe a
              smaller firm will help with that. Though many who are just listed
              as tax preparers and cpas are licensed to do all aspects of your
              tax paperwork, for debt relief working with a company who
              specializes in reducing tax bills is advised.{" "}
            </p>
          </div>
          <div className='py-2'>
            {" "}
            <Image
              src='/finding6.jpg'
              alt='find best cpa or tax attorney'
              height='600px'
              width='600px'
            />
          </div>
        </div>
        <br></br>
        <br />
        <div className='grid-2'>
          <div>
            {" "}
            <Image
              src='/finding7.png'
              alt='find best cpa or tax attorney'
              height='600px'
              width='600px'
            />
          </div>
          <div>
            <h4>
              #7) Have you made early withdrawals from your 401k as part of your
              debt?{" "}
            </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              This is going to be a very common problem for folks coming into
              2022 and 2023 as the IRS begins processing all the tax
              discrepancies accrued since the beginning of the pandemic. But, be
              advised if you have drawn down from a TSA or 401K and you are
              younger than 59 and a half, there are penalties accrued that must
              be considered in the tabulation of your withdrawal, and if you do
              not report or pay this amount as a tax when you make these draw
              downs, you will find yourself with a nasty surprise tax bill at
              the end of what was already an incredibly trying time for a lot of
              people. So if you are currently living off of retirement and are
              about to file your taxes, you should strongly consider speaking to
              a tax professional to contact the IRS on your behalf in advance of
              the nasty surprise waiting for you. If you do not begin to make
              the proper tax payments immediately, you will be in a lot of
              trouble from the added penalties the IRS is going to impose on the
              late tax you may not have realized you owed in the first place.{" "}
            </p>
          </div>
        </div>
        <br></br>
        <br />
        <div className='grid-2a'>
          <div className='py-3'>
            {" "}
            <Image
              src='/finding8.jpg'
              alt='find best cpa or tax attorney'
              height='200px'
              width='400px'
            />
          </div>
          <div>
            <h4>#8) What is your Average Monthly Income? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              If you're like most people, saving money is tough, most can't
              afford an added expense of a five hundred dollars to their month
              to month without being completely broke. Thats why the primary
              calculation figure the IRS uses (unless you have giant savings
              accounts) is your available monthly income. They use a calculation
              that is tabulated based on a number of factors including what part
              of the country you live in, your age, your marital status to
              provide what they believe is a maximum allowable for various
              living expense categories. Once that number is determined any
              income you report they above that is theirs for the taking unless
              you have a structured deal with them which is often best
              negotiated by tax professionals.{" "}
            </p>
          </div>
        </div>
        <br></br>

        <br />
        <div className='grid-2c'>
          <div>
            <h4>#9) What do you value in service? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              Having answered the first eight questions the final two are geared
              more towards looking at what sort of experience you require with
              your accountant. For some meeting face to face is a must, that is
              why we try to provide local address listings for companies in your
              area. If that is not a reality for you, then its only a matter of
              what level of excellence in your service do you want. There is a
              certain amount of personalization working with a local accountant
              that is not duplicated by any large accounting firm, but the
              rigorous standards larger companies are held to and their more
              ubiquitus and universal money back guarantees make them a better
              choice for someone who is new to owing taxes.{" "}
            </p>
          </div>

          <div className='all-center'>
            <Image
              src='/finding9.jpg'
              alt='find best cpa or tax attorney'
              height='200px'
              width='200px'
            />
          </div>
        </div>
        <br></br>
        <br />

        <div className='grid-2a'>
          <div className='all-center'>
            <Image
              src='/finding10.jpg'
              alt='find best cpa or tax attorney'
              height='300px'
              width='300px'
            />
          </div>
          <div className='py-2'>
            <h4>#10) What are you waiting for? </h4>
            <br />
            <p style={{ textIndent: "25px" }}>
              {" "}
              All of the companies we partner with have free consultation phone
              calls that can let you know the size and scale of your problem.
              This ability to instantly contact the IRS and diagnos your case in
              an afternoon is not something the smaller guys are really equipped
              for. So if you don't know what you owe or how big your problem is,
              start with one of the nationally listed firms, and utilized their
              free consultation. Then from there if you determine that the
              nature of your tax problem is one that is managed by one of the
              local options, you have taken advantage of a great free service
              and are knowledgeable about your taxes.{" "}
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default TaxCompanies;

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const postsDirectory = path.join(process.cwd(), "verticals");
  const filenames = fs.readdirSync(postsDirectory);

  const verticals = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const verticals = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return verticals;
  });

  return {
    props: {
      verticals,
    },
  };
}
