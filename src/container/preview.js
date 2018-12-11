// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 700,
//   },
// });

// class TodoTable extends Component{
//     render(){
//   const { classes } = this.props;
//   const {list , onEdit , onDelete} = this.props;

//   return (
//       <div>
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Todos</TableCell>
//             <TableCell>Edit</TableCell>
//             <TableCell>Delete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {this.props.list.map((value , index) => {
//             return (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   {value}
//                 </TableCell>
//                 <TableCell>
//                 <Button
//                     onClick ={() =>{onEdit(index)}}
//                     >
//                     Edit
//                     </Button>
//                 </TableCell>
//                 <TableCell>
//                 <Button
//                     onClick ={() =>{onDelete(index)}}
//                     >
//                     Delete
//                     </Button>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </Paper>
//     </div>
//   );
// }
// }

// TodoTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(TodoTable);
