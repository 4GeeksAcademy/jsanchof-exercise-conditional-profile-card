import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  //Check for name and last name and update based on the avalable data or turns back to default if just the name or last name is null
  let name = "<h1>Lucy Melocoton</h1>";
  if (variables.name != null) {
    if (variables.lastName != null) {
      name = `<h1>${variables.name} ${variables.lastName}</h1>`;
    } else {
      name = `<h1>${variables.name} Melocoton</h1>`;
    }
  } else if (variables.lastName != null) {
    name = `<h1>Lucy ${variables.lastName}</h1>`;
  }

  // checks the role
  let profession = "";
  variables.role == null
    ? (profession = "<h2>Web Developer</h2>")
    : (profession = `<h2>${variables.role}</h2>`);

  // checks the location
  let location = "<h3>Miami, USA</h3>";
  if (variables.city != null) {
    if (variables.country != null) {
      location = `<h3>${variables.city}, ${variables.country}</h3>`;
    } else {
      location = `<h3>${variables.city}, USA</h3>`;
    }
  } else if (variables.country != null) {
    location = `<h3>Miami, ${variables.country}</h3>`;
  }

  // set and update link for Twitter
  let twitter = "";
  variables.twitter == null
    ? (twitter = "https://x.com/4geeksacademy")
    : (twitter = `https://x.com/${variables.twitter}`);

  // set and update link for github
  let github = "";
  variables.github == null
    ? (github = "https://github.com/4geeksacademy")
    : (github = `https://github.com/${variables.github}`);

  // set and update link for linkedIn
  let linkedin = "";
  variables.linkedin == null
    ? (linkedin = "https://linkedin.com/school/4geeksacademy/")
    : (linkedin = `https://linkedin.com/in/${variables.linkedin}`);

  // set and update link for instagram
  let insta = "";
  variables.instagram == null
    ? (insta = "https://instagram.com/4geeksacademy/")
    : (insta = `https://instagram.com/${variables.instagram}`);

  // set position right or left on the social media position
  let position = "";
  variables.socialMediaPosition == null
    ? (position = `position-left`)
    : (position = `position-right`);

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
          ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          ${name}
          ${profession}
          ${location}
          <ul class="${position}">
            <li><a href="${twitter}"><i class="fab fa-twitter"></i></a></li>
            <li><a href="${github}"><i class="fab fa-github"></i></a></li>
            <li><a href="${linkedin}"><i class="fab fa-linkedin"></i></a></li>
            <li><a href="${insta}"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
