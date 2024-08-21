import Categories from "./(components)/Categories";
import Courses from "./(components)/Courses";
import Welcome from "./(components)/Welcome";

const HomePage = async () => {
  return (
    <>
      <Welcome />
      <Categories />
      <Courses />
    </>
  );
};
export default HomePage;
