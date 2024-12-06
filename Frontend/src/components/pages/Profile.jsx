import { useEffect, useState } from 'react';
import { FaSpinner, FaExclamationCircle } from 'react-icons/fa'; // Import React Icons
import { useParams } from 'react-router-dom';
import { APISource } from '../../data/source-api';
import profil from '../../assets/profile.png';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(?:\+62|62|0)[2-9][0-9]{8,12}$/;
  return phoneRegex.test(phone);
};

const validateForm = (data) => {
  const errors = {};
  if (!data.fullname) errors.fullname = "Nama lengkap harus diisi";
  if (!data.email) errors.email = "Email harus diisi";
  if (data.password && data.password.length < 6) errors.password = "Password minimal 6 karakter";
  if (!validatePhoneNumber(data.phone_number)) errors.phone_number = "Format nomor telepon tidak valid";
  if (!data.address || data.address.length < 10) errors.address = "Alamat minimal 10 karakter";
  if (!data.gender) errors.gender = "Jenis kelamin harus dipilih";
  return errors;
};

export const Profile = ({ isDarkMode }) => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await APISource.getProfile(userId);
        setProfile(userData);
        setEditedProfile(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const validationErrors = validateForm(editedProfile);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Menampilkan konfirmasi menggunakan SweetAlert
    const confirmSave = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Perubahan ini akan disimpan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      reverseButtons: true,
    });

    if (confirmSave.isConfirmed) {
      try {
        setLoading(true);
        await APISource.updateProfile(userId, editedProfile);
        setProfile(editedProfile);
        console.log("Profile updated successfully", editedProfile);
        setIsEditing(false);
        setErrors({});

        // Menampilkan toast setelah berhasil menyimpan
        Swal.fire('Berhasil', 'Profil telah diperbarui.', 'success');
      } catch (err) {
        setError(err.message);
        toast.error('Gagal memperbarui profil!');
      } finally {
        setLoading(false);
      }
    } else {
      toast.info('Pembaharuan profil dibatalkan');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    toast.info('Pembaharuan profil dibatalkan');
  };

  const EditableField = ({ label, field, value, type = "text", error }) => {
    const [localValue, setLocalValue] = useState(value || '');

    useEffect(() => {
      if (!isEditing) {
        setLocalValue(value || '');
      }
    }, [isEditing, value]);

    const handleInputChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleBlur = () => {
      setEditedProfile((prev) => ({
        ...prev,
        [field]: localValue,
      }));
    };

    return (
      <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{label}:</p>
        {isEditing ? (
          <div>
            <input type={type} value={localValue} onChange={handleInputChange} onBlur={handleBlur} className={`w-full p-3 rounded-xl border ${error ? 'border-red-500' : 'border-gray-200'} ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`} />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        ) : (
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{value}</p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center space-x-3">
        <FaSpinner className="animate-spin text-gray-500 text-3xl" />
        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 flex justify-center items-center space-x-2">
        <FaExclamationCircle className="text-red-600 text-3xl" />
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{error}</p>
      </div>
    );
  }

  return (
    <div className={`container mx-auto p-4 pt-20 max-w-4xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`shadow-2xl rounded-2xl p-8 backdrop-blur-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative group">
            <img
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-gray-100 object-cover transition-transform hover:scale-105"
              src={profile.profilePicture || `${profil}`} alt="Profile" />
            {isEditing && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white bg-blue-500 px-3 py-1 rounded-lg text-sm">
                  Change Photo
                </button>
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              {profile.fullname}
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>{profile.email}</p>

            {!isEditing ? (
              <button onClick={handleEdit}
                className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <div className="space-x-3 mt-4">
                <button onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0 .5 transition-all duration-200">
                  Save Changes
                </button>
                <button onClick={handleCancel}
                  className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} border-b pb-2`}>Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField label="Full Name" field="fullname" value={profile.fullname} error={errors?.fullname} />
            <EditableField label="Email" field="email" value={profile.email} type="email" error={errors?.email} />
            {isEditing && (
              <EditableField label="Password" field="password" value={editedProfile.password || ''} type="password" error={errors?.password} />
            )}
            <EditableField label="Phone" field="phone_number" value={profile.phone_number} error={errors?.phone_number} />
            <EditableField label="Address" field="address" value={profile.address} error={errors?.address} />
            {isEditing && (
              <div className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <p className={`font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Gender:</p>
                <select value={editedProfile.gender || ''} onChange={(e) => setEditedProfile((prev) => ({ ...prev, gender: e.target.value }))}
                  className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'} border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}>
                  <option value="">Select Gender</option>
                  <option value="L">Male</option>
                  <option value="P">Female</option>
                </select>
                {errors?.gender && <p className="text-red-500 text-sm mt-2">{errors.gender}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};