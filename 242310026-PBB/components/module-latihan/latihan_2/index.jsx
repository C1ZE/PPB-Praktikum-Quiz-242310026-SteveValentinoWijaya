import { StyleSheet, Text, View } from "react-native";

const Latihan2 = () => {
  const personalData = {
    name: "Steve Valentino Wijaya",
    jurusan: "Teknologi Informasi (Informatika)",
    aktif: true,
  };

  const course_lists = [
    { id: 1, name: "Mobile Programming", code: "PPB01" },
    { id: 2, name: "Web Programming", code: "PW04" },
    { id: 3, name: "Calculus", code: "AC09" },
  ];

  const extracurricular = ["Basketball", "Robotics", "Mentoring"];
  const total_point = 120;
  const criteria_point = total_point >= 300;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <Text>Fullname: {personalData.name}</Text>
      <Text>Jurusan: {personalData.jurusan}</Text>
      <Text>Status: {personalData.aktif ? "Active" : "Not Active"}</Text>

      <Text style={styles.title}>My Courses</Text>
      {course_lists.map((course) => (
        <Text key={course.id}>
          {course.code} - {course.name}
        </Text>
      ))}

      <Text style={styles.title}>Extracurricular</Text>
      {extracurricular.map((item, index) => (
        <Text key={index}>- {item}</Text>
      ))}

      <Text style={styles.title}>Evaluation Criteria</Text>
      <Text>{criteria_point ? "Eligible" : "Ineligible"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Latihan2;