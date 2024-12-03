import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APISource } from '../../data/source-api';

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

export const Profile = () => {
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

    try {
        setLoading(true);
        await APISource.updateProfile(userId, editedProfile);
        setProfile(editedProfile);
        console.log("Profile updated successfully" , editedProfile);
        setIsEditing(false);
        setErrors({});
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
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
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <p className="font-semibold text-gray-700 mb-3">{label}:</p>
        {isEditing ? (
          <div>
            <input
              type={type}
              value={localValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full bg-white p-3 rounded-xl border ${
                error ? 'border-red-500' : 'border-gray-200'
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        ) : (
          <p className="text-gray-600">{value}</p>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-20 max-w-4xl">
      <div className="bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative group">
            <img
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-gray-100 object-cover transition-transform hover:scale-105"
              src={profile.profilePicture || 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-HD-Image.png'}
              alt="Profile"
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white bg-blue-500 px-3 py-1 rounded-lg text-sm">
                  Change Photo
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {profile.fullname}
            </h1>
            <p className="text-gray-600 mt-2 text-lg">{profile.email}</p>
            
            {!isEditing ? (
              <button 
                onClick={handleEdit}
                className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <div className="space-x-3 mt-4">
                <button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Save Changes
                </button>
                <button 
                  onClick={handleCancel}
                  className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField label="Full Name" field="fullname" value={profile.fullname} error={errors?.fullname} />
            <EditableField label="Email" field="email" value={profile.email} type="email" error={errors?.email} />
            {isEditing && (
              <EditableField 
                label="Password" 
                field="password" 
                value={editedProfile.password || ''} 
                type="password" 
                error={errors?.password} 
              />
            )}
            <EditableField label="Phone" field="phone_number" value={profile.phone_number} error={errors?.phone_number} />
            <EditableField label="Address" field="address" value={profile.address} error={errors?.address} />
            {isEditing && (
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <p className="font-semibold text-gray-700 mb-3">Gender:</p>
                <select
                  value={editedProfile.gender || ''}
                  onChange={(e) => setEditedProfile((prev) => ({ ...prev, gender: e.target.value }))}
                  className="w-full bg-white p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
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
    </div>
  );
};
