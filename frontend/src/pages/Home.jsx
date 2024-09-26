import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { Timeline, Text } from "@mantine/core";
import {
  FaRegQuestionCircle,
  FaSearch,
  FaRegGrinStars,
  FaHandHoldingMedical,
} from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <div className="my-10 flex justify-center">
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item
            bullet={<FaHandHoldingMedical size={12} />}
            title="In Safe Hands"
          >
            <Text c="dimmed" size="sm">
              You&apos;ve decided to{" "}
              <Text variant="link" component="span" inherit>
                put yourself
              </Text>{" "}
              <Link className="underline font-bold text-black" to="/register">
                right here
              </Link>
            </Text>

            <Text size="xs" mt={4}>
              Now
            </Text>
          </Timeline.Item>

          <Timeline.Item bullet={<FaRegGrinStars size={12} />} title="Delighted to Help">
            <Text c="dimmed" size="sm">
              You&apos;ve clicked 23 links to {""}
              <Text variant="link" component="span" inherit>
                reach us
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              10 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Search Request"
            bullet={<FaSearch size={12} />}
            lineVariant="dashed"
          >
            <Text c="dimmed" size="sm">
              You&apos;ve submitted a search request {""}
              <Text variant="link" component="span" inherit>
                to fix health issue (#13)
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              20 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item
            title="Health Matters"
            bullet={<FaRegQuestionCircle size={12} />}
          >
            <Text c="dimmed" size="sm">
              <Text variant="link" component="span" inherit>
                Your family
              </Text>{" "}
              needs you at your best
            </Text>
            <Text size="xs" mt={4}>
              30 minutes ago
            </Text>
          </Timeline.Item>
        </Timeline>
      </div>
      <Footer />
    </>
  );
};

export default Home;
