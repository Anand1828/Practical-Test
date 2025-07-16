import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../features/products/productsSlice';
import { updateProduct } from '../features/products/productsSlice';
import { addProduct } from '../features/products/productsSlice';
import '../Auth.css';
// Add MUI imports
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Chip,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function truncate(str, n) {
  return str && str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  const [editOpen, setEditOpen] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');
  const [editPrice, setEditPrice] = React.useState('');
  const [editDiscount, setEditDiscount] = React.useState('');
  const [editRating, setEditRating] = React.useState('');
  const [editStock, setEditStock] = React.useState('');
  const [editBrand, setEditBrand] = React.useState('');
  const [editCategory, setEditCategory] = React.useState('');
  const [editSku, setEditSku] = React.useState('');

  const [createOpen, setCreateOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [newPrice, setNewPrice] = React.useState('');
  const [newDiscount, setNewDiscount] = React.useState('');
  const [newRating, setNewRating] = React.useState('');
  const [newStock, setNewStock] = React.useState('');
  const [newBrand, setNewBrand] = React.useState('');
  const [newCategory, setNewCategory] = React.useState('');
  const [newSku, setNewSku] = React.useState('');

  const handleEditOpen = (product) => {
    setEditProduct(product);
    setEditTitle(product.title);
    setEditDescription(product.description || '');
    setEditPrice(product.price || '');
    setEditDiscount(product.discountPercentage || '');
    setEditRating(product.rating || '');
    setEditStock(product.stock || '');
    setEditBrand(product.brand || '');
    setEditCategory(product.category || '');
    setEditSku(product.sku || '');
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setEditProduct(null);
    setEditTitle('');
    setEditDescription('');
    setEditPrice('');
    setEditDiscount('');
    setEditRating('');
    setEditStock('');
    setEditBrand('');
    setEditCategory('');
    setEditSku('');
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editProduct && editTitle.trim()) {
      dispatch(updateProduct({
        id: editProduct.id,
        updates: {
          title: editTitle,
          description: editDescription,
          price: Number(editPrice),
          discountPercentage: Number(editDiscount),
          rating: Number(editRating),
          stock: Number(editStock),
          brand: editBrand,
          category: editCategory,
          sku: editSku
        }
      })).then(() => {
        showSnackbar('Product updated successfully');
      });
      handleEditClose();
    }
  };

  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => {
    setCreateOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
    setNewDiscount('');
    setNewRating('');
    setNewStock('');
    setNewBrand('');
    setNewCategory('');
    setNewSku('');
  };
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      dispatch(addProduct({
        title: newTitle,
        description: newDescription,
        price: Number(newPrice),
        discountPercentage: Number(newDiscount),
        rating: Number(newRating),
        stock: Number(newStock),
        brand: newBrand,
        category: newCategory,
        sku: newSku
      })).then(() => {
        showSnackbar('Product created successfully');
      });
      handleCreateClose();
    }
  };

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Snackbar state
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
  const showSnackbar = (message, severity = 'success') => setSnackbar({ open: true, message, severity });
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteProductId, setDeleteProductId] = React.useState(null);
  const handleDeleteClick = (id) => {
    setDeleteProductId(id);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    dispatch(deleteProduct(deleteProductId)).then(() => {
      showSnackbar('Product deleted successfully');
    });
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteProductId(null);
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', p: 0, m: 0, bgcolor: '#f5f5f5' }}>
      <Card sx={{ width: '100%', height: '100%', boxShadow: 3, borderRadius: 0 }}>
        <CardContent sx={{ height: '100%', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Product List
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateOpen}>
              Create Product
            </Button>
          </Box>
          {loading && <Typography>Loading products...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && (
            <TableContainer component={Paper} sx={{ mt: 2, height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <Table stickyHeader sx={{ minWidth: 1100 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(product => (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          src={product.thumbnail}
                          alt={product.title}
                          sx={{ width: 56, height: 56, bgcolor: 'grey.100' }}
                        />
                      </TableCell>
                      <TableCell title={product.title}>
                        <Typography variant="subtitle2" noWrap>{truncate(product.title, 24)}</Typography>
                      </TableCell>
                      <TableCell title={product.description}>
                        <Typography variant="body2" noWrap>{truncate(product.description, 40)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={`${product.price}`} color="success" variant="outlined" size="small" />
                      </TableCell>
                      <TableCell>
                        {product.discountPercentage ? (
                          <Chip label={`${product.discountPercentage}%`} color="info" size="small" />
                        ) : '-'}
                      </TableCell>
                      <TableCell title={String(product.rating)}>
                        {product.rating ? (
                          <Typography sx={{ color: '#fbc02d', fontWeight: 600 }}>
                            ★ {product.rating.toFixed(2)}
                          </Typography>
                        ) : '-'}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.sku || '-'}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <IconButton color="primary" size="small" aria-label="edit" onClick={() => handleEditOpen(product)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton color="error" size="small" aria-label="delete" onClick={() => handleDeleteClick(product.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {/* Edit Product Dialog */}
          <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Product</DialogTitle>
            <form onSubmit={handleEditSubmit}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Price"
                  type="number"
                  fullWidth
                  value={editPrice}
                  onChange={e => setEditPrice(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Discount (%)"
                  type="number"
                  fullWidth
                  value={editDiscount}
                  onChange={e => setEditDiscount(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Rating"
                  type="number"
                  fullWidth
                  value={editRating}
                  onChange={e => setEditRating(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Stock"
                  type="number"
                  fullWidth
                  value={editStock}
                  onChange={e => setEditStock(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Brand"
                  type="text"
                  fullWidth
                  value={editBrand}
                  onChange={e => setEditBrand(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Category"
                  type="text"
                  fullWidth
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="SKU"
                  type="text"
                  fullWidth
                  value={editSku}
                  onChange={e => setEditSku(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
              </DialogActions>
            </form>
          </Dialog>
          {/* Delete Confirmation Dialog */}
          <MuiDialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
            <MuiDialogTitle>Confirm Delete</MuiDialogTitle>
            <MuiDialogContent>Are you sure you want to delete this product?</MuiDialogContent>
            <MuiDialogActions>
              <Button onClick={handleDeleteCancel}>Cancel</Button>
              <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
            </MuiDialogActions>
          </MuiDialog>
          {/* Create Product Dialog */}
          <Dialog open={createOpen} onClose={handleCreateClose}>
            <DialogTitle>Create Product</DialogTitle>
            <form onSubmit={handleCreateSubmit}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Price"
                  type="number"
                  fullWidth
                  value={newPrice}
                  onChange={e => setNewPrice(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Discount (%)"
                  type="number"
                  fullWidth
                  value={newDiscount}
                  onChange={e => setNewDiscount(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Rating"
                  type="number"
                  fullWidth
                  value={newRating}
                  onChange={e => setNewRating(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Stock"
                  type="number"
                  fullWidth
                  value={newStock}
                  onChange={e => setNewStock(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Brand"
                  type="text"
                  fullWidth
                  value={newBrand}
                  onChange={e => setNewBrand(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Category"
                  type="text"
                  fullWidth
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="SKU"
                  type="text"
                  fullWidth
                  value={newSku}
                  onChange={e => setNewSku(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCreateClose}>Cancel</Button>
                <Button type="submit" variant="contained">Add</Button>
              </DialogActions>
            </form>
          </Dialog>
          {/* Snackbar Notification */}
          <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
} 