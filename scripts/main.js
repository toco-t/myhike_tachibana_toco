function read_display_quotes() {
  db.collection("quotes").doc("tuesday")
    .onSnapshot(tuesdayDoc => {
      console.log(tuesdayDoc.data())
      document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;
    })
}

read_display_quotes();

function insertName() {
  // check if the user is logged in
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid);
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then(userDoc => {
        // get user name
        var user_Name = userDoc.data().name;
        console.log(user_Name);
        document.getElementById("name-goes-here").innerHTML = user_Name
      })
    }

  })
}

insertName();

function writeHikeData() {
  max = 21;
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");
  for (i = 1; i <= max; i++) {
    hikesRef.add({ //add to database, autogen ID
      code: "id" + i,
      name: "hike" + i,
      details: "This hike is amazing!  You will love going on hike" + i
    })
  }
}

writeHikeData();

function displayCards(collection) {
  let cardTemplate = document.getElementById("hikeCardTemplate");

  db.collection(collection).get()
    .then(snap => {
      var i = 1;
      snap.forEach(doc => { //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var details = doc.data().details; // get value of the "details" key
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.card-title').innerHTML = title;
        newcard.querySelector('.card-text').innerHTML = details;
        // newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

        //give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
        i++;
      })
    })
}

displayCards("hikes");
