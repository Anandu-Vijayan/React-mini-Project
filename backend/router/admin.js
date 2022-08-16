const express  =require('express')
const { getAllUser,getRoomData,removeCompanyseat, blockUser,approveApp,assignSeat,declineApp, unBlockUser,getSeats, editUser, deleteUSer, deleteUser,getApplications, addSeat } = require('../controllers/userController')


const router=express.Router()
 

router.get('/',(req,res)=>{

 res.send('Admin ')

})
router.get('/usersData',getAllUser )

router.patch('/blockUser',blockUser)
router.patch('/unBlockUser',unBlockUser)
router.post('/edituser',editUser)
router.patch('/deleteUSer',deleteUser)
router.get('/get-applications',getApplications)
router.patch('/approve-app',approveApp)
router.patch('/decline-app',declineApp)
router.post('/add-seat',addSeat)
router.get('/get-seats',getSeats)
router.post('/removecompany',removeCompanyseat)
router.get('/getRoomsData',getRoomData )
router.post('/assign-seat',assignSeat)

module.exports = router;