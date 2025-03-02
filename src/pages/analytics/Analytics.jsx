import { useEffect, useState } from "react";
import styles from "./analytics.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from '../../components/navbar/Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from '@mui/x-charts/PieChart';
import { createClick, getAppTypeClicks, getClicksCountForShop, getClicksCountForSocial, getCtaCount, getMonthlyClicks, getTopLinks, getUserDeviceClicks } from "../../services";

const Analytics = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [flag, setFlag] = useState(true);
  const [appFlag, setAppFlag] = useState(true);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [ctaCounts, setCtaCounts] = useState(0);
  const [socialCounts, setSocialCounts] = useState(0);
  const [shopCounts, setShopCounts] = useState(0);
  const [months, setMonths] = useState([]);
  const [clickCounts, setClickCounts] = useState([]);
  const [deviceClicks, setDeviceClicks] = useState({
    Linux: 0,
    Windows: 0,
    android: 0,
    ios: 0,
    mac: 0,
    Other: 0
  });
  const [sites, setSites] = useState({
    Youtube: 0,
    Instagram: 0,
    Facebook: 0,
    Twitter: 0
  })
  const [deviceType, setDeviceType] = useState([]);
  const [deviceValue, setDeviceValue] = useState([]);
  const [topTitle, setTopTitle] = useState([]);
  const [topClicks, setTopClicks] = useState([]);

  useEffect(() => {
    getCtaCounts();
    getClicksCountsForSocial();
    getClicksCountsForShop();
    monthlyClicks();
    topLinks();
  }, []);

  useEffect(() => {
    userDeviceClicks();
  }, [flag]);

  useEffect(() => {
    appTypeClicks();
  }, [appFlag]);

  const getCtaCounts = async () => {
    try {
      const response = await getCtaCount(userId, token);
      if (response.status == 200) {
        const data = await response.json();
        setCtaCounts(data.data.ctaCounts);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const getClicksCountsForSocial = async () => {
    try {
      const response = await getClicksCountForSocial(userId, token);
      if (response.status == 200) {
        const data = await response.json();
        setSocialCounts(data.totalClicks);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const getClicksCountsForShop = async () => {
    try {
      const response = await getClicksCountForShop(userId, token);
      if (response.status == 200) {
        const data = await response.json();
        setShopCounts(data.totalClicks);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const monthlyClicks = async () => {
    try {
      const response = await getMonthlyClicks(userId);
      if (response.status == 200) {
        const data = await response.json();
        setMonths(Object.keys(data.monthlyClicks));
        setClickCounts(Object.values(data.monthlyClicks));
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const userDeviceClicks = async () => {
    try {
      const response = await getUserDeviceClicks(userId);
      if (response.status == 200) {
        const data = await response.json();
        if (flag) {
          updateDeviceClicks(data.deviceClicks);
        }
        setFlag(false);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const appTypeClicks = async () => {
    try {
      const response = await getAppTypeClicks(userId);
      if (response.status == 200) {
        const data = await response.json();
        if (appFlag) {
          updateSites(data.appTypeClicks);
        }
        setAppFlag(false);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const topLinks = async () => {
    try {
      const response = await getTopLinks(userId);
      if (response.status == 200) {
        const data = await response.json();
        updateTopData(data.topLinks);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const updateSites = (response) => {
    setSites((prevSites) => ({
      ...prevSites, // Keep existing keys
      ...Object.fromEntries(
        Object.entries(response).map(([key, value]) => [
          key,
          (prevSites[key] || 0) + value // Update existing values
        ])
      )
    }));
  };

  const updateTopData = (data) => {
    // Extract titles and clicks
    const titles = data.map(item => item.title);
    const clicks = data.map(item => item.noOfClicks);

    // Update state
    setTopTitle(titles);
    setTopClicks(clicks);
  };

  const updateDeviceClicks = (response) => {
    setDeviceClicks((prevClicks) => {
      const updatedClicks = {
        ...prevClicks,
        ...Object.fromEntries(
          Object.entries(response).map(([key, value]) => [
            key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
            (prevClicks[key.charAt(0).toUpperCase() + key.slice(1)] || 0) + value,
          ])
        ),
      };

      // Extract keys and values after updating state
      setDeviceType(Object.keys(updatedClicks));
      setDeviceValue(Object.values(updatedClicks));
      return updatedClicks;
    });
  };

  const getColor = (label) => {
    const colorMap = {
      Youtube: "#165534",
      Instagram: "#94E9B8",
      Facebook: "#3EE58F",
      Twitter: "#21AF66",
    };

    return colorMap[label] || "#CCCCCC";
  };

  const colorMap = {
    Youtube: "#165534",
    Instagram: "#94E9B8",
    Facebook: "#3EE58F",
    Twitter: "#21AF66",
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start || end) {
      const normalizedStart = new Date(start);
      normalizedStart.setHours(0, 0, 0, 0);

      const normalizedEnd = new Date(end);
      normalizedEnd.setHours(0, 0, 0, 0);

      if (today < normalizedStart || today > normalizedEnd) {
        setSites({ Youtube: 0, Instagram: 0, Facebook: 0, Twitter: 0 });
        setDeviceType([]);
        setDeviceValue([]);
        setTopTitle([]);
        setTopClicks([]);
      } else {
        appTypeClicks();
        userDeviceClicks();
        topLinks();
      }
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={styles.analyticsPageContainer}>
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className={styles.navContainer}>
        <Navbar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.top}>
          <div className={styles.overview}>Overview</div>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              isClearable
              placeholderText="Select date range"
              className={styles.datePickerInput}
            />
          </div>
        </div>
        <div className={styles.numbersRow}>
          <div className={styles.social}>
            <div>Clicks on Links</div>
            <div className={styles.num}>{socialCounts}</div>
          </div>
          <div className={styles.shop}>
            <div>Clicks on Shop</div>
            <div className={styles.num}>{shopCounts}</div>
          </div>
          <div className={styles.shop}>
            <div>CTA</div>
            <div className={styles.num}>{ctaCounts}</div>
          </div>
        </div>
        <div className={styles.lineGraph}>
          <LineChart
            xAxis={[
              {
                scaleType: "band",
                data: months,
              },
            ]}
            yAxis={[
              {
                max: 10,
              },
            ]}
            series={[
              {
                data: clickCounts,
                label: "Clicks",
                color: "grey",
              },
            ]}
            width={undefined}
            height={400}
          />
        </div>
        <div className={styles.graphsSecondRow}>
          <div className={styles.deviceGraph}>
            <div className={styles.deviceHeading}>
              Traffic by Device
            </div>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: deviceType,
                },
              ]}
              yAxis={[
                {
                  max: 10,
                },
              ]}
              series={[
                {
                  data: deviceValue,
                  label: "Clicks",
                  color: "#3EE58F",
                },
              ]}
              width={undefined}
              height={300}
            />
          </div>
          <div className={styles.deviceGraph}>
            <div className={styles.deviceHeading}>
              Sites
            </div>
            <div className={styles.pieBox}>
              <PieChart
                series={[
                  {
                    data: Object.entries(sites).map(([label, value], index) => ({
                      id: index,
                      value: value,
                      color: getColor(label),
                    })),
                  },
                ]}
                width={400}
                height={200}
              />
              <div className={styles.appNames}>
                {Object.entries(sites).map(([site, value]) => (
                  <div
                    key={site}
                    className={styles.appNameBox}
                  >
                    <div className={styles.appName}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          backgroundColor: colorMap[site] || "#CCCCCC", // Default gray if no match
                          borderRadius: "50%",
                        }}
                      />
                      <span >{site}</span>
                    </div>
                    <span style={{ fontSize: "16px", fontWeight: "500" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.linksGraph}>
          <div className={styles.deviceHeading}>Traffic by links</div>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: topTitle,
              },
            ]}

            yAxis={[
              {
                max: 10,
              },
            ]}
            series={[
              {
                data: topClicks,
                label: "Clicks",
                color: "#3EE58F",
              },
            ]}
            width={undefined}
            height={400}
          />
        </div>
      </div>
    </div>
  )
}

export default Analytics;