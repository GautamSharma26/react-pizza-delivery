// import React from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useState } from 'react';

// const ShopDelete = (e, shopdata) => {

//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     e.preventDefault();
//     axios.delete(`http://127.0.0.1:8000/product/shop/${shopdata.id}/`)
//         .then(res => [console.log(res), handleShow()])
//         .catch(err => [console.log(err, "dd"), handleShow()])
//     return <div>
//         {/* <!-- Button trigger modal --> */}
//         {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
//   Launch demo modal
// </button> */}
//         {show && <><Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal></>}
//     </div>;
// }

// // #endregion

// export default ShopDelete;