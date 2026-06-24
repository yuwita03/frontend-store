import { useState } from 'react'

export function useConfirm() {
  const [confirmState, setConfirmState] = useState(null)
  // confirmState = { title, message, onConfirm } atau null

  const confirm = ({ title, message, onConfirm }) => {
    setConfirmState({ title, message, onConfirm })
  }

  const handleConfirm = () => {
    confirmState?.onConfirm()
    setConfirmState(null)
  }

  const handleCancel = () => {
    setConfirmState(null)
  }

  return { confirmState, confirm, handleConfirm, handleCancel }
}

//  * useConfirm — reusable confirmation modal hook
//  *
//  * CARA PAKAI:
//  * 1. Import hook dan component:
//  *    import { useConfirm } from '../../hooks/useConfirm'
//  *    import ConfirmModal from '../../components/UI/ConfirmModal'
//  *
//  * 2. Destructure di komponen:
//  *    const { confirmState, confirm, handleConfirm, handleCancel } = useConfirm()
//  *
//  * 3. Trigger modal:
//  *    confirm({
//  *      title: 'Hapus Produk',
//  *      message: 'Yakin mau hapus?',
//  *      onConfirm: () => handleDelete(id)
//  *    })
//  *
//  * 4. Taruh ConfirmModal di JSX (cukup sekali, di luar map):
//  *    <ConfirmModal
//  *      isOpen={!!confirmState}
//  *      title={confirmState?.title}
//  *      message={confirmState?.message}
//  *      onConfirm={handleConfirm}
//  *      onCancel={handleCancel}
//  *    />
//  *