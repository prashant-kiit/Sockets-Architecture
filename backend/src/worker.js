import axios from "axios";

const helper = async () => {
  try {
    console.log("Big Computation Started");
    // big computation
    for (let i = 0; i < 10000; i++) {
      console.log("Iteration:", i);
    }
    const response = await axios.get("http://localhost:3001/hook");
    console.log("Data from API:", response.data.message);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

helper();
