import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Pagination({ totalCount, page, onPageChange }) {
    const totalPages = Math.ceil(totalCount / 5);

    return (
        <View style={styles.container}>
            <Button title="Previous" disabled={page <= 1} onPress={() => onPageChange(page - 1)} />
            <Button title="Next" disabled={page >= totalPages} onPress={() => onPageChange(page + 1)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
});
