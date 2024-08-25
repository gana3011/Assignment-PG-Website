fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

    const pgListings = [
        {
            id: 1,
            name: "PG in Location A",
            price: "₹6000",
            image: "pg1.jpg",
            location: "chennai",
            gender: "male",
            budget: "low",
            amenities: ["ac"],
            roomType: "shared"
        },
        {
            id: 2,
            name: "PG in Location B",
            price: "₹8000",
            image: "pg2.jpg",
            location: "mumbai",
            gender: "female",
            budget: "medium",
            amenities: ["non-ac"],
            roomType: "individual"
        },
        {
            id: 3,
            name: "PG in Location C",
            price: "₹12000",
            image: "pg1.jpg",
            location: "chennai",
            gender: "unisex",
            budget: "high",
            amenities: ["ac"],
            roomType: "shared"
        },
        {
            id: 4,
            name: "PG in Location D",
            price: "₹7000",
            image: "pg2.jpg",
            location: "chennai",
            gender: "female",
            budget: "medium",
            amenities: ["non-ac"],
            roomType: "individual"
        }
    ];

    document.addEventListener('DOMContentLoaded', function() {
        const searchForm = document.getElementById('search-form');
        const searchLocation = document.getElementById('search-location');
        
        if (searchForm && searchLocation) {
            searchForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission behavior

                const location = searchLocation.value.trim().toLowerCase(); // Get and trim the location input
                if (location) {
                    // Redirect to results.html with the location parameter
                    window.location.href = `results.html?location=${encodeURIComponent(location)}`;
                }
            });
        }
    });
    
    let selectedLocation = ''; // Global variable to store the selected location

    document.addEventListener('DOMContentLoaded', function() {
        const urlParams = new URLSearchParams(window.location.search);
        selectedLocation = urlParams.get('location') || ''; // Extract the location from URL
        
        console.log("Selected Location:", selectedLocation); // Debugging line

        if (selectedLocation) {
            filterListings(); // Immediately filter listings based on the selected location
        }

        const filterForm = document.getElementById('filter-form');
        if (filterForm) {
            filterForm.addEventListener('change', function() {
                filterListings();
            });
        }
    });

    function renderListings(listings) {
        const listingsContainer = document.querySelector('.pg-listings');
        listingsContainer.innerHTML = ''; // Clear previous listings
        listings.forEach(pg => {
            const pgElement = `
                <div class="pg-listing">
                    <img src="${pg.image}" alt="${pg.name}">
                    <div class="pg-info">
                        <h3>${pg.name}</h3>
                        <p>Price: ${pg.price}</p>
                        <button class="view-details">View Details</button>
                    </div>
                </div>
            `;
            listingsContainer.innerHTML += pgElement;
        });
    }

    function filterListings() {
        const budgetFilters = Array.from(document.querySelectorAll(".budget-filter:checked")).map(input => input.value);
        const amenitiesFilters = Array.from(document.querySelectorAll(".amenities-filter:checked")).map(input => input.value);
        const roomTypeFilters = Array.from(document.querySelectorAll(".room-type-filter:checked")).map(input => input.value);
        const genderFilters = Array.from(document.querySelectorAll(".gender-filter:checked")).map(input => input.value);

        console.log("Selected Gender Filters:", genderFilters); // Debugging line

        const filteredListings = pgListings.filter(pg => {
            let match = true;

            // Always apply the location filter
            if (selectedLocation) {
                match = match && pg.location.toLowerCase().includes(selectedLocation);
            }

            // Apply budget filter
            if (budgetFilters.length > 0) {
                match = match && budgetFilters.includes(pg.budget);
            }

            // Apply amenities filter
            if (amenitiesFilters.length > 0) {
                match = match && amenitiesFilters.some(amenity => pg.amenities.includes(amenity));
            }

            // Apply room type filter
            if (roomTypeFilters.length > 0) {
                match = match && roomTypeFilters.includes(pg.roomType);
            }

            // Apply gender filter
            if (genderFilters.length > 0) {
                match = match && genderFilters.includes(pg.gender);
            }

            console.log(`PG ${pg.name} matches:`, match); // Debugging line

            return match;
        });

        console.log("Filtered Listings:", filteredListings); // Debugging line

        renderListings(filteredListings);
    }