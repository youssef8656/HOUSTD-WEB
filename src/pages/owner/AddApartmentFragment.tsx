import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ImagePlus, CheckCircle } from 'lucide-react';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
];

interface Props {
  onSuccess: () => void;
}

export default function AddApartmentFragment({ onSuccess }: Props) {
  const { currentUser } = useAuth();
  const { addApartment } = useData();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('1');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_IMAGES[0]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title || !address || !price || !description) {
      setError('Please fill all fields');
      return;
    }
    addApartment({
      ownerId: currentUser?.id || '',
      ownerName: currentUser?.name || '',
      title,
      address,
      price: Number(price),
      beds: Number(beds),
      rating: 0,
      imageUrl: selectedImage,
      description,
      status: 'Pending',
    });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSuccess();
    }, 1500);
  };

  if (success) {
    return (
      <div className="px-4 pt-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Listing Submitted!</h2>
        <p className="text-gray-500 mt-2">Your apartment is pending admin approval</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Apartment</h1>
      <p className="text-gray-500 text-sm mb-6">Fill in the details below</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose an Image</label>
          <div className="grid grid-cols-4 gap-2">
            {SAMPLE_IMAGES.map((img, i) => (
              <button key={i} type="button" onClick={() => setSelectedImage(img)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${selectedImage === img ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
                {selectedImage === img && (
                  <div className="absolute inset-0 bg-indigo-500/30 flex items-center justify-center">
                    <ImagePlus size={18} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
            placeholder="Modern Studio Near Campus" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
            placeholder="123 University Ave, Downtown" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Price ($/month)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
              placeholder="450" min="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Beds</label>
            <select value={beds} onChange={e => setBeds(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition bg-white">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Bed' : 'Beds'}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition resize-none"
            placeholder="Describe your apartment..." />
        </div>

        <button type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
          Submit for Approval
        </button>
      </form>
    </div>
  );
}
