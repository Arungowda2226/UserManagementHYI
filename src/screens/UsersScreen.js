import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, clearError } from '../features/users/usersSlice';
import UserFormModal from '../components/UserFormModal';
import Pagination from '../components/Pagination';

export default function UsersScreen() {
    const dispatch = useDispatch();
    const { users, loading, error, page, totalCount } = useSelector(state => state.users);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers(page));
    }, [dispatch, page]);

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error, [{ text: 'OK', onPress: () => dispatch(clearError()) }]);
        }
    }, [error]);

    const handleDelete = (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this user?',
            [
                { text: 'Cancel' },
                { text: 'Delete', onPress: () => dispatch(deleteUser(id)) },
            ]
        );
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setModalVisible(true);
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Button title="Add User" onPress={handleAddUser} />
            {loading && <ActivityIndicator size="large" style={{ marginVertical: 10 }} />}
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text>{item.email}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <Button title="Edit" onPress={() => handleEdit(item)} />
                            <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
                        </View>
                    </View>
                )}
            />
            <Pagination
                totalCount={totalCount}
                page={page}
                onPageChange={(newPage) => dispatch(fetchUsers(newPage))}
            />
            <UserFormModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                editingUser={editingUser}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttons: { flexDirection: 'row', gap: 8 },
    name: { fontWeight: 'bold', fontSize: 16 },
});
