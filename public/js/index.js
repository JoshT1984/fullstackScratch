const $btn = $(".fetch").on("click", fetchCardData);
// buttonClick();

async function fetchCardData() {
  $("#card-container").empty();
  let $newPic;
  let colorsArray = [];
  let picturesArray = [];
  let numberArray = [];
  let randomColor = Math.floor(Math.random() * 10);

  try {
    let cardData = await $.get("/cards");
    cardData.forEach((property) => {
      // console.log(property);
      colorsArray.push(property.background_color);
      numberArray.push(property.card_number);
    });

    let pictureData = await $.get("/cards/images");
    pictureData.forEach((image) => {
      picturesArray.push(image.file_path.replace("/public", ""));
    });

    $newPic = $(`<img>`).addClass("sbImage");
    $newPic.attr("src", picturesArray[randomColor]);
    $("#card-container")
      .css("background-color", colorsArray[randomColor])
      .append($newPic);
    fetchJokeAPI(); //Adds Joke
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchJokeAPI() {
  try {
    let jokeData = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const jokeJSON = await jokeData.json();
    let $jokeText = $(".txt").text(jokeJSON.joke);
  } catch (error) {
    console.error(error);
  }
}

// async function buttonClick() {
//   try {
//     let postData = await fetch("/cards", {
//       method: "POST",
//       body: JSON.stringify(`card_number:${$input}`),
//     });
//     $("#submit").on("click", function (e) {
//       e.preventDefault();
//       encodeURI($("input").val());
//       console.log(postData);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
