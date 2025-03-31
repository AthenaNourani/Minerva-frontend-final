import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../redux/features/order/orderApi'

const UpdateOrderModal = ({ order, isOpen, onClose }) => {
    // Status des Auftrags initialisieren
    const [status, setStatus] = useState(order?.status || "pending")
    const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation()

    // Funktion zum Aktualisieren des Auftragsstatus
    const handleUpdateOrderStatus = async () => {
        try {
            await updateOrderStatus({ id: order?._id, status }).unwrap()
            onClose() // Modal nach erfolgreichem Update schließen
        } catch (error) {
            console.error("Error updating order status:", error)
        }
    }

    // Modal nicht anzeigen, wenn `isOpen` false ist
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
                
                {/* Dropdown zur Auswahl des Status */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                
                {/* Fehleranzeige */}
                {error && <p className="text-red-500 mb-4">Failed to update status.</p>}
                
                {/* Buttons für Aktion */}
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrderModal
