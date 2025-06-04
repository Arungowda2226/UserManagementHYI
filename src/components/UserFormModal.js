import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../features/users/usersSlice';

export default function UserFormModal({ visible, onClose, editingUser }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
        } else {
            setName('');
            setEmail('');
        }
    }, [editingUser]);

    const validate = () => {
        if (!name.trim()) {
            Alert.alert('Validation Error', 'Name is required');
            return false;
        }
        if (!email.trim() || !email.includes('@')) {
            Alert.alert('Validation Error', 'Valid email is required');
            return false;
        }
        return true;
    };

    const onSubmit = () => {
        if (!validate()) return;

        if (editingUser) {
            dispatch(updateUser({ id: editingUser.id, user: { name, email } }))
                .unwrap()
                .then(() => onClose());
        } else {
            dispatch(addUser({ name, email }))
                .unwrap()
                .then(() => onClose());
        }
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>{editingUser ? 'Edit User' : 'Add User'}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Button title="Save" onPress={onSubmit} />
                    <Button title="Cancel" color="red" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
});
