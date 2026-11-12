// TerraFrame - Image Search Functionality

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
const emptyState = document.getElementById("empty-state");
const resultCount = document.getElementById("result-count");
const quickPicks = document.getElementById("quick-picks");

// Sample image collection
const galleryItems = [
  {
    title: "Green Forest",
    category: "Nature",
    tags: "nature forest trees green wildlife",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600"
  },
  {
    title: "Beautiful Mountains",
    category: "Nature",
    tags: "nature mountains mountain landscape hills",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600"
  },
  {
    title: "Modern Architecture",
    category: "Architecture",
    tags: "architecture buildings modern design",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600"
  },
  {
    title: "City Skyline",
    category: "Architecture",
    tags: "architecture city buildings urban skyline",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600"
  },
  {
    title: "Beautiful Lake",
    category: "Travel",
    tags: "travel lake water mountains nature",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600"
  },
  {
    title: "Mountain Adventure",
    category: "Travel",
    tags: "travel mountains adventure landscape",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"
  },
  {
    title: "Wild Deer",
    category: "Animals",
    tags: "animals deer wildlife forest nature",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600"
  },
  {
    title: "Wildlife Portrait",
    category: "Animals",
    tags: "animals wildlife nature lion",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600"
  }
];

// Display search results
function displayResults(items) {
  resultsContainer.innerHTML = "";

  resultCount.textContent =
    `${items.length} ${items.length === 1 ? "frame" : "frames"} found`;

  if (items.length === 0) {
    emptyState.hidden = false;
    emptyState.querySelector("h3").textContent = "No frames found";
    emptyState.querySelector("p").textContent =
      "Try another topic to discover more inspiration.";
    return;
  }

  emptyState.hidden = true;

  items.forEach(item => {
    const card = document.createElement("article");
    card.className = "result-card";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.hidden = true;
    });

    const heading = document.createElement("h3");
    heading.textContent = item.title;

    const category = document.createElement("p");
    category.textContent = item.category;

    card.appendChild(image);
    card.appendChild(heading);
    card.appendChild(category);

    resultsContainer.appendChild(card);
  });
}

// Search function
function searchGallery(query) {
  const searchTerm = query.trim().toLowerCase();

  if (!searchTerm) {
    resultsContainer.innerHTML = "";
    resultCount.textContent = "0 frames found";
    emptyState.hidden = false;
    emptyState.querySelector("h3").textContent =
      "Your gallery starts here!";
    emptyState.querySelector("p").textContent =
      "Enter a topic above to get ready for your next visual discovery.";
    return;
  }

  const searchWords = searchTerm.split(/\s+/);

  const filteredItems = galleryItems.filter(item => {
    const searchableText =
      `${item.title} ${item.category} ${item.tags}`.toLowerCase();

    return searchWords.every(word =>
      searchableText.includes(word)
    );
  });

  displayResults(filteredItems);
}

// Search form submission
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  searchGallery(searchInput.value);
});

// Popular topic buttons
quickPicks.addEventListener("click", function(event) {
  if (event.target.classList.contains("chip")) {
    const topic = event.target.textContent.trim();

    searchInput.value = topic;
    searchGallery(topic);
  }
});

// Initial state
searchGallery("");
