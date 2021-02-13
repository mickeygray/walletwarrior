import path from "path";
import fs from "fs";
import Home from "../components/Home";
import { useEffect, useState } from "react";
import fetch from "isomorphic-fetch";
import { useAppContext } from "../contexts/state.js";

const index = ({ firms, blogs, verticals }) => {
  const { addIp } = useAppContext();

  useEffect(() => {
    fetch("https://api.ipify.org?format=jsonp?callback=?", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.text();
      })
      .then((ip) => {
        addIp({
          ipadd: ip,
          startTime: new Date().getTime(),
          siteJoin: Intl.DateTimeFormat(
            "fr-CA",
            {
              timeZone: "America/Los_Angeles",
            },
            {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
          ).format(new Date(Date.now())),
        });
      });
  }, []);
  /*
  const [ip1, setIp] = useState({ ipadd: "", startTime: "", siteJoin: "" });

  useEffect(() => {
    if (ip1.ipadd.length > 0) {
      addIp(ip1);
    }
  }, [ip1, addIp]);
*/

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
    <div>
      <Home
        firms={firms[0].firms}
        blogs={blogs[0].blogs}
        verticals={verticals[0].verticals}
      />
    </div>
  );
};

export default index;
export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "firms");
  const filenames = fs.readdirSync(postsDirectory);

  const firms = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const firms = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return {
      firms,
    };
  });

  const gostsDirectory = path.join(process.cwd(), "verticals");
  const gilenames = fs.readdirSync(gostsDirectory);

  const verticals = gilenames.map((filename) => {
    const filePath = path.join(gostsDirectory, filename);
    const verticals = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return {
      verticals,
    };
  });

  const rostsDirectory = path.join(process.cwd(), "blogs");
  const rilenames = fs.readdirSync(rostsDirectory);

  const blogs = rilenames.map((filename) => {
    const filePath = path.join(rostsDirectory, filename);
    const blogs = JSON.parse(fs.readFileSync(filePath, "utf8"));

    return {
      blogs,
    };
  });
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      firms,
      verticals,
      blogs,
    },
  };
}
