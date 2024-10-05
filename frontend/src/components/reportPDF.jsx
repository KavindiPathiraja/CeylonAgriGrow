import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Create styles for the PDF document
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
        padding: 10,
        borderBottom: '1px solid black',
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
    },
    text: {
        fontSize: 12,
    }
});

// PDF document component
const ReportPDF = ({ crops }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Crops Report</Text>
            {crops.map((crop, index) => (
                <View key={index} style={styles.section}>
                    <Text style={styles.text}>Crop Name: {crop.CropName}</Text>
                    <Text style={styles.text}>Sciencetific Name: {crop.ScientificName}</Text>
                    <Text style={styles.text}>Soil Type: {crop.SoilType}</Text>
                    <Text style={styles.text}>Rainfall: {crop.RainFall}</Text>
                    <Text style={styles.text}>Temperature: {crop.Temperature}</Text>
                    <Text style={styles.text}>Location: {crop.Location}</Text>
                    <Text style={styles.text}>Crop Area: {crop.CropArea}</Text>
                    <Text style={styles.text}>Growth Stage: {crop.GrowthStage}</Text>
                    <Text style={styles.text}>Soil pH Level: {crop.SoilpHLevel}</Text>
                    <Text style={styles.text}>Irrigation Type: {crop.IrrigationType}</Text>

                </View>
            ))}
        </Page>
    </Document>
);

const PDF = ({ crops }) => {
    return (
        <div className="pdf-download bg-white h-10 w-56 rounded-md text-center m-auto flex justify-center items-center">
            <PDFDownloadLink document={<ReportPDF crops={crops} />} fileName="crops_report.pdf" className='items-center'>
                {({ loading }) => (loading ? 'Generating PDF...' : 'Download Crops Report PDF')}
            </PDFDownloadLink>
        </div>
    );
};

export default PDF;
