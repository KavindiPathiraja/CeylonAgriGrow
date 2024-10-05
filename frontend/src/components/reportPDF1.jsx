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
const ReportPDF = ({ aiResponse }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Fertilizers</Text>
            <View style={styles.section}>
                <Text style={styles.text}>aiResponse</Text>
            </View>
        </Page>
    </Document>
);

const PDF = ({ aiResponse }) => {
    return (
        <div className="pdf-download bg-white h-10 w-56 rounded-md text-center m-auto flex justify-center items-center">
            <PDFDownloadLink document={<ReportPDF aiResponse={aiResponse} />} fileName="fertilizer.pdf" className='items-center'>
                {({ loading }) => (loading ? 'Generating PDF...' : 'Download Crops Report PDF')}
            </PDFDownloadLink>
        </div>
    );
};

export default PDF;
