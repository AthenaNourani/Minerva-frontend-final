import React, { useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery } from '../../../redux/features/order/orderApi'
import { Link } from 'react-router-dom'
import UpdateOrderModal from './UpdateOrderModal'
import { formatDate } from '../../../utils/formatDate' // Stelle sicher, dass die Datei existiert

const ManageOrders = () => {
  // Bestellungen abrufen
  const { data: getAllOrders = [], isLoading, error } = useGetAllOrdersQuery()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [deleteOrder] = useDeleteOrderMutation()

  // Bearbeiten eines Auftrags
  const handleEditOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  // Schließen des Modals
  const handleCloseOrder = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  // Löschen eines Auftrags
  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap()
      alert('Order deleted successfully')
    } catch (error) {
      console.error('Failed to delete order:', error)
    }
  }

  // Ladeanzeige anzeigen
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong</div>

  return (
    <div className='selection__container p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Manage Orders</h2>
      <table className='bg-gray-100 w-full border-collapse'>
        <thead>
          <tr>
            <th className='py-3 px-4 border-b'>Order Id</th>
            <th className='py-3 px-4 border-b'>Customer</th>
            <th className='py-3 px-4 border-b'>Status</th>
            <th className='py-3 px-4 border-b'>Date</th>
            <th className='py-3 px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getAllOrders.length > 0 ? (
            getAllOrders.map((order, index) => (
              <tr key={order?._id || index}>
                <td className='py-3 px-3 border-b'>{order?.orderId}</td>
                <td className='py-3 px-3 border-b'>{order?.email}</td>
                <td className='py-3 px-3 border-b'>
                  <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(order?.status)}`}>
                    {order?.status}
                  </span>
                </td>
                <td className='py-3 px-3 border-b'>
                  {order?.updatedAt ? formatDate(order.updatedAt) : 'N/A'}
                </td>
                <td className='py-3 px-3 border-b flex items-center space-x-4'>
                  <Link to='#' className='text-blue-500 hover:underline'>View</Link>
                  <button className='text-blue-500 hover:underline' onClick={() => handleEditOrder(order)}>
                    Edit
                  </button>
                  <button className='text-red-500 hover:underline' onClick={() => handleDeleteOrder(order?._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Update Order Modal */}
      {selectedOrder && (
        <UpdateOrderModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseOrder} />
      )}
    </div>
  )
}

// Gibt die passende Farbe für den Status zurück
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500'
    case 'processing':
      return 'bg-blue-500'
    case 'shipped':
      return 'bg-green-500'
    case 'completed':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

export default ManageOrders
