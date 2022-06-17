import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = props => {
  const addMeetupHandler = (enteredMeetupData) => {
    console.log("Meetup data: ", enteredMeetupData);
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
