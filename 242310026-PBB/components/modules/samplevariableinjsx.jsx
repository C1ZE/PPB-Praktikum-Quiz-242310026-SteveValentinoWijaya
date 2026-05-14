import React from 'react';
import { View, Text } from 'react-native';

const SampleVariableInJsx = () => {
    const title = "Contoh penggunaan variable pada JSX";
    const personalData = {
        name: "Anton Sukamto",
        jurusan: "Teknologi Informasi",
        aktif: true,
    };
    const extracurricular = ["Basketball", "Robotics", "Mentoring"];
    const a = 10, b = 20;

    return (
        <View>
            <Text>{title}</Text>
            <Text>Jawaban penjumlahan: {a + b}</Text>

            <Text>Memanggil data array pada JSX</Text>
            <Text>Extracurricular:</Text>
            
            {extracurricular.map((item, index) => (
                <Text key={index}>- {item}</Text>
            ))}

            <Text>Memanggil data Object pada JSX</Text>
            <Text>Fullname: {personalData.name}</Text>
            <Text>Department: {personalData.jurusan}</Text>
            
            <Text>Status: {personalData.aktif ? "Active" : "Not Active"}</Text>
        </View>
    );
};

export default SampleVariableInJsx;