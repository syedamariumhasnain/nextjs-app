import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = props => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    console.log("Meetup data: ", enteredMeetupData);

    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json"
      }
    }); 

    const data = await response.json();

    console.log(data);

    router.push("/");
    // router.replace("/");   ===> If we want user not be navigated back 
    // to this page again using back button.
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
