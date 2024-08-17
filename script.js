const API_KEY = "-XTD6Hfa0080_HjvNjdwssXrC7_pR7YMEHn4t7DWAnA";
const form = document.getElementById("Search-form");
const searchbox = document.getElementById("searchbox");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

const API_URL = "https://api.unsplash.com/search/photos";

// Initialize page state
let currentPage = 1;
const resultsPerPage = 10; // Number of images to show per page

// Function to fetch images from Unsplash API
async function fetchImages(query, page) {
  try {
    const response = await fetch(
      `${API_URL}?query=${query}&page=${page}&per_page=${resultsPerPage}&client_id=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched images:", data); // Debugging information
    return data.results;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// Function to display images on the page
function displayImages(images) {
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.regular;
    imgElement.alt = image.alt_description || "Image";
    searchResult.appendChild(imgElement); // Append new images to the existing results
  });
}

// Handle form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchbox.value.trim();
  if (query) {
    searchResult.innerHTML = ""; // Clear previous results for a new search
    currentPage = 1; // Reset page number for new search
    const images = await fetchImages(query, currentPage);
    if (images.length > 0) {
      displayImages(images);
      showMoreBtn.style.display = "block"; // Show "Show more" button
    } else {
      showMoreBtn.style.display = "none"; // Hide "Show more" button if no images
    }
  }
});

// Handle "Show more" button click
showMoreBtn.addEventListener("click", async () => {
  const query = searchbox.value.trim();
  if (query) {
    currentPage++;
    const images = await fetchImages(query, currentPage);
    if (images.length > 0) {
      displayImages(images);
    } else {
      showMoreBtn.style.display = "none"; // Hide "Show more" button if no more images
    }
  }
});
