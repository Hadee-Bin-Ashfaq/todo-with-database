import React, { Component } from 'react';
// import { Input, FormControl, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
// import CircularUnderLoad from '../container/loader';
// import TodoTable from '../container/preview';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import '../App.css';
import './config';
import * as firebase from 'firebase';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            user: '',
            todo: [],
            isLoding: false,
            isSignIn: true,
            key: '',
            editing: false,
            // buttonText:'',
            index: 0,
            uid: props.location.state ? props.location.state : '',
        };
        this.ref = firebase.database().ref();
    }
    componentDidMount() {
        if (this.state.uid) {
            this.getData();
        }
        else {
            this.props.history.replace('/');
        }
        this.setState({
            isLoading: true
        })
    }
    getData = () => {
        const { uid, } = this.state;
        this.ref.child(uid).on('value', snapshot => {
            const todoList = snapshot.val();
            const todo = [];
            for (let key in todoList) {
                todoList[key].key = key;
                todo.push(todoList[key]);
            }

            if (firebase.auth().currentUser) {
                this.setState({
                    email: firebase.auth().currentUser.email
                    // user:firebase.auth().currentUser
                })
            }
            this.setState({
                todo,
                isLoading: false
            })
        })
    }
    getValue = option => {
        const { name, value } = option.target;
        this.setState({
            [name]: value,
        });
    }

    onSubmit = () => {
        const { uid, editing } = this.state;
        if (this.state.message === '') {
            return;
        }
        if (!editing) {
            const { message } = this.state;
            // const newTodo = this.state.todo.slice(0);
            // newTodo.push(this.state.message);
            const key = this.ref.child(uid).push().key;
            this.ref.child(uid).child(key).set({ message, key })
            // this.setState({
            //     todo: newTodo,
            //     message: '',
            //     editing: false,
            //     isLoading: false
            // });
        }
        else {
            const {message,key} = this.state;
            this.ref.child(uid).child(key).set({
                message, key
            });
        }
        this.setState({
            message: '',
            key: '',
            editing: false,
            isLoading: false,
        });
    }
    onDismiss = (key, ind) => {
        const { uid, todo } = this.state;
        todo.splice(ind, 1)
        this.ref.child(uid).child(key).remove();
        this.setState({
            todo,
            editing: false,
            isLoading: false,
            message: ''
        });
    }
    handleSignOut = () => {
        firebase.auth().signOut();
        this.setState({
            uid: null
        })
        this.props.history.replace('/');
    }

    onUpdate = (value, key) => {
        this.setState({
            editing:true,
            message: value,
            key,
        })
    }

    render() {
        const { classes } = this.props;
        const { email, message, editing, todo } = this.state;
        console.log(this.state.user);
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.grow}>
                                {email}
                            </Typography>
                            <Button color="inherit" onClick={this.handleSignOut}>LogOut</Button>
                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                    <TextField
                        label="What u Want to do"
                        name="message"
                        value={message}
                        className={classes.textField}
                        // margin="small"
                        variant="filled"
                        onChange={this.getValue}
                    />
                    <Button
                        className={classes.alignBox}
                        color={editing ? 'default' : 'primary'}
                        size='medium'
                        variant='contained'
                        onClick={this.onSubmit} >
                        {editing ? 'Update' : 'Add'}
                    </Button>
                </div>
                {/* {isLoading ?
                <div>
                    <CircularUnderLoad />
                </div>
                :
                Array.isArray(todo) && todo.length > 0 ?
                <TodoTable 
                list = {todo}
                onEdit = {this.onUpdate}
                onDelete = {this.onDismiss}
                />
                : ''
                } */}

                <div className={classes.rootTable}>
                    <Paper>
                        {todo.length > 0 ?
                            <Table>
                                {todo.map(
                                    (value, ind) => {
                                        return (
                                            <tbody key={ind}>
                                                <TableRow>
                                                    <TableCell className='cell-width'>{value.message}</TableCell>
                                                    <TableCell className='cell-width'>
                                                        <Button variant="contained" color="primary" onClick={() => this.onUpdate(value.message, value.key)}>Edit</Button>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <Button variant="contained" color="primary" onClick={() => this.onDismiss(value.key, ind)}>Delete</Button>
                                                    </TableCell>
                                                </TableRow>
                                            </tbody>
                                        )
                                    }
                                )}
                            </Table>
                            :
                            ''}
                    </Paper>
                </div>

            </div>
        );
    }
}
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    textField: {
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit * 5,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 50,
    },
    alignBox: {
        marginTop: 120,
        marginLeft: -230,
        width: 100,
        height: '5vh'
    },
    rootTable: {
        width: '50%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        minWidth: 700,
    },

});
export default withStyles(styles)(Todo);