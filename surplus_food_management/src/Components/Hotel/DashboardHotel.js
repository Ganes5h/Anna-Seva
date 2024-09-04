import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import CountUp from "react-countup";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardContent = styled(CardContent)({
  textAlign: "center",
});

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 400,
  marginBottom: theme.spacing(4),
}));

function AnimatedNumber({ value }) {
  return (
    <CountUp
      end={value}
      duration={2.5}
      separator=","
      decimals={0}
      decimal="."
    />
  );
}

function DashboardHotel() {
  const { user } = useSelector((state) => state.auth);
  const [totalDonations, setTotalDonations] = useState(0);
  const [donationsByStatus, setDonationsByStatus] = useState([]);
  const [monthlyDonations, setMonthlyDonations] = useState([]);
  const [donationsByCategory, setDonationsByCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalDonationsResponse = await axios.get(
          `http://localhost:5000/api/hotel/statistics/total-donations/${user._id}`
        );
        setTotalDonations(totalDonationsResponse.data.totalDonations);

        const donationsByStatusResponse = await axios.get(
          `http://localhost:5000/api/hotel/statistics/donations-by-status/${user._id}`
        );
        setDonationsByStatus(donationsByStatusResponse.data.donationsByStatus);

        const monthlyDonationsResponse = await axios.get(
          `http://localhost:5000/api/hotel/statistics/monthly-donations/${user._id}`
        );
        setMonthlyDonations(monthlyDonationsResponse.data.monthlyDonations);

        const donationsByCategoryResponse = await axios.get(
          `http://localhost:5000/api/hotel/statistics/donations-by-category/${user._id}`
        );
        setDonationsByCategory(
          donationsByCategoryResponse.data.donationsByCategory
        );
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [user._id]);

  const donationsByStatusData = {
    labels: donationsByStatus.map((status) => status._id),
    datasets: [
      {
        label: "Donations by Status",
        data: donationsByStatus.map((status) => status.count),
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const monthlyDonationsData = {
    labels: monthlyDonations.map(
      (donation) => `${donation._id.month}-${donation._id.year}`
    ),
    datasets: [
      {
        label: "Monthly Donations",
        data: monthlyDonations.map((donation) => donation.count),
        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
      },
    ],
  };

  const donationsByCategoryData = {
    labels: donationsByCategory.map((category) => category._id),
    datasets: [
      {
        label: "Donations by Category",
        data: donationsByCategory.map((category) => category.count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        {/* Total Donations */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Total Donations
              </Typography>
              <Typography variant="h3" component="div">
                <AnimatedNumber value={totalDonations} />
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        {/* Donations by Status */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Donations by Status
              </Typography>
              <Typography variant="h3" component="div">
                <AnimatedNumber
                  value={donationsByStatus.reduce(
                    (acc, status) => acc + status.count,
                    0
                  )}
                />
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        {/* Monthly Donations */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Monthly Donations
              </Typography>
              <Typography variant="h3" component="div">
                <AnimatedNumber
                  value={monthlyDonations.reduce(
                    (acc, donation) => acc + donation.count,
                    0
                  )}
                />
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        {/* Donations by Category */}
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Donations by Category
              </Typography>
              <Typography variant="h3" component="div">
                <AnimatedNumber
                  value={donationsByCategory.reduce(
                    (acc, category) => acc + category.count,
                    0
                  )}
                />
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <Bar
              data={donationsByStatusData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartContainer>
            <Doughnut
              data={donationsByCategoryData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </ChartContainer>
        </Grid>
      </Grid>
      <ChartContainer>
        <Line
          data={monthlyDonationsData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </ChartContainer>
    </Box>
  );
}

export default DashboardHotel;
