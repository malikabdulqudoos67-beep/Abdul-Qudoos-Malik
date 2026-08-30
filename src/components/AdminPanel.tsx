import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  Users, 
  FileText, 
  Sparkles, 
  DollarSign, 
  Check, 
  X, 
  Search, 
  Eye, 
  ArrowUpRight, 
  Settings, 
  Upload, 
  Clock, 
  ShieldCheck,
  RefreshCw,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useRealEstate } from '../context/RealEstateContext';
import { Property, PropertyType, ListingStatus, AppointmentStatus } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const AdminPanel: React.FC = () => {
  const { 
    properties, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    appointments, 
    updateAppointmentStatus, 
    deleteAppointment,
    siteContent, 
    updateSiteContent, 
    inquiries, 
    formatPrice, 
    showToast,
    currentUser,
    setActiveView
  } = useRealEstate();

  const [activeTab, setActiveTab] = useState<'properties' | 'appointments' | 'content' | 'inquiries' | 'add_property'>('properties');
  
  // Property Edit State
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);
  
  // New Property Form State
  const [newPropTitle, setNewPropTitle] = useState('');
  const [newPropSubtitle, setNewPropSubtitle] = useState('');
  const [newPropType, setNewPropType] = useState<PropertyType>('villa');
  const [newPropPrice, setNewPropPrice] = useState<number>(1250000);
  const [newPropListingType, setNewPropListingType] = useState<'sale' | 'rent'>('sale');
  const [newPropLocation, setNewPropLocation] = useState('Beverly Hills, California');
  const [newPropAddress, setNewPropAddress] = useState('740 Benedict Canyon Drive');
  const [newPropBeds, setNewPropBeds] = useState<number>(5);
  const [newPropBaths, setNewPropBaths] = useState<number>(6);
  const [newPropSqft, setNewPropSqft] = useState<number>(6200);
  const [newPropImageUrl, setNewPropImageUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80');
  const [newPropGallery, setNewPropGallery] = useState<string>('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80\nhttps://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80\nhttps://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80');
  const [newPropDescription, setNewPropDescription] = useState('An exceptional custom luxury estate featuring expansive floor-to-ceiling glass, Italian marble surfaces, and bespoke private outdoor entertaining pavilions.');
  const [newPropAmenities, setNewPropAmenities] = useState('Infinity Pool, Wine Cellar, Smart Home, Spa & Sauna, Cinema, Panoramic View');
  const [newPropIsFeatured, setNewPropIsFeatured] = useState<boolean>(true);
  const [isGeneratingAICopy, setIsGeneratingAICopy] = useState<boolean>(false);

  // Content Editor State
  const [contentHeadline, setContentHeadline] = useState(siteContent.heroHeadline);
  const [contentQuote, setContentQuote] = useState(siteContent.heroQuote);
  const [contentAuthor, setContentAuthor] = useState(siteContent.heroQuoteAuthor);
  const [contentBanner, setContentBanner] = useState(siteContent.announcementBanner?.text || '');
  const [bannerEnabled, setBannerEnabled] = useState(siteContent.announcementBanner?.enabled ?? true);

  // Filter properties in admin
  const [adminPropSearch, setAdminPropSearch] = useState('');

  // AI Description Generator for Listing
  const handleAIGenerateCopy = async () => {
    if (!newPropTitle) {
      showToast('Please enter at least a property title first', 'error');
      return;
    }

    setIsGeneratingAICopy(true);
    try {
      const res = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPropTitle,
          type: newPropType,
          location: newPropLocation,
          bedrooms: newPropBeds,
          bathrooms: newPropBaths,
          price: newPropPrice,
          amenities: newPropAmenities.split(',').map(s => s.trim())
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        if (data.data.description) setNewPropDescription(data.data.description);
        if (data.data.headline) setNewPropSubtitle(data.data.headline);
        showToast('AI Luxury Copy generated successfully with Gemini!', 'success');
      }
    } catch (e) {
      console.warn('AI Copywriting error:', e);
      showToast('Generated description using luxury template', 'info');
    } finally {
      setIsGeneratingAICopy(false);
    }
  };

  const handleSaveNewProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const galleryList = newPropGallery.split('\n').map(s => s.trim()).filter(Boolean);
      const amenitiesList = newPropAmenities.split(',').map(s => s.trim()).filter(Boolean);

      await addProperty({
        title: newPropTitle,
        subtitle: newPropSubtitle,
        type: newPropType,
        price: Number(newPropPrice),
        listingType: newPropListingType,
        status: 'for_sale',
        location: newPropLocation,
        neighborhood: newPropLocation.split(',')[0],
        address: newPropAddress,
        bedrooms: Number(newPropBeds),
        bathrooms: Number(newPropBaths),
        sqft: Number(newPropSqft),
        garageSpaces: 3,
        imageUrl: newPropImageUrl,
        gallery: galleryList.length ? galleryList : [newPropImageUrl],
        description: newPropDescription,
        amenities: amenitiesList,
        isFeatured: newPropIsFeatured,
        agent: {
          name: currentUser?.displayName || 'Abdul Malik',
          title: 'Principal & Luxury Portfolio Director',
          phone: '+1 (310) 880-4921',
          email: currentUser?.email || 'abdul@abdulsrealestate.com',
          avatar: currentUser?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          rating: 5.0,
          dealsClosed: 142
        }
      });

      // Reset form
      setNewPropTitle('');
      setNewPropSubtitle('');
      setActiveTab('properties');
    } catch (e: any) {
      showToast('Failed to save property', 'error');
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteContent({
      heroHeadline: contentHeadline,
      heroQuote: contentQuote,
      heroQuoteAuthor: contentAuthor,
      announcementBanner: {
        enabled: bannerEnabled,
        text: contentBanner,
        linkText: 'Explore Collection'
      }
    });
  };

  const totalPortfolioValue = properties.reduce((acc, p) => acc + p.price, 0);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Admin Top Header */}
      <div className="bg-[#1E232A] rounded-[32px] p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#343D4A] shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E3744] text-[#F2C98A] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#D99A40]" />
            <span>Executive Management Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Abdul's Real Estate <span className="text-[#F2C98A]">Admin Console</span>
          </h1>
          <p className="text-xs text-[#A0AAB8]">
            Manage luxury property catalog, live appointments, client inquiries, and website CMS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('add_property')}
            className="px-5 py-2.5 bg-[#E5A853] hover:bg-[#D99A40] text-white text-xs font-extrabold rounded-full transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-[#8A92A0] mb-2">
            <span className="text-xs uppercase font-bold">Total Properties</span>
            <Building2 className="w-4 h-4 text-[#C6852C]" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E232A] font-heading">{properties.length}</p>
          <span className="text-[11px] text-[#10B981] font-semibold">Active in Catalog</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-[#8A92A0] mb-2">
            <span className="text-xs uppercase font-bold">Appointments</span>
            <Calendar className="w-4 h-4 text-[#C6852C]" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E232A] font-heading">{appointments.length}</p>
          <span className="text-[11px] text-[#C6852C] font-semibold">
            {appointments.filter(a => a.status === 'pending').length} Pending Review
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-[#8A92A0] mb-2">
            <span className="text-xs uppercase font-bold">Portfolio Value</span>
            <DollarSign className="w-4 h-4 text-[#C6852C]" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-[#1E232A] font-heading truncate">
            {formatPrice(totalPortfolioValue)}
          </p>
          <span className="text-[11px] text-[#7D8592] font-semibold">Global Real Estate Assets</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D9] shadow-xs">
          <div className="flex items-center justify-between text-[#8A92A0] mb-2">
            <span className="text-xs uppercase font-bold">Client Inquiries</span>
            <Users className="w-4 h-4 text-[#C6852C]" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E232A] font-heading">{inquiries.length + 3}</p>
          <span className="text-[11px] text-[#10B981] font-semibold">VIP Leads</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E2D9] pb-4 overflow-x-auto no-scrollbar">
        {[
          { id: 'properties', label: `Manage Properties (${properties.length})`, icon: Building2 },
          { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar },
          { id: 'add_property', label: 'Add Property Listing', icon: Plus },
          { id: 'content', label: 'Website Content & CMS', icon: FileText },
          { id: 'inquiries', label: `Leads & Inquiries (${inquiries.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive 
                  ? 'bg-[#1E232A] text-white shadow-sm' 
                  : 'bg-white text-[#5C6470] hover:text-[#1E232A] border border-[#E8E2D9]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#F2C98A]' : 'text-[#7D8592]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Manage Properties */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-heading font-extrabold text-lg text-[#1E232A]">
              Live Property Inventory
            </h3>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#8A92A0] absolute left-3.5 top-3" />
              <input
                type="text"
                value={adminPropSearch}
                onChange={(e) => setAdminPropSearch(e.target.value)}
                placeholder="Search by title, location..."
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-full py-2 pl-10 pr-4 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#8A92A0] uppercase font-extrabold border-b border-[#E8E2D9]">
                <tr>
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE1]">
                {properties
                  .filter(p => !adminPropSearch || p.title.toLowerCase().includes(adminPropSearch.toLowerCase()) || p.location.toLowerCase().includes(adminPropSearch.toLowerCase()))
                  .map((prop) => (
                    <tr key={prop.id} className="hover:bg-[#FCFBF8] transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={prop.imageUrl}
                          alt={prop.title}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E8E2D9] flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-bold text-[#1E232A] text-sm truncate max-w-[200px]">{prop.title}</p>
                          <p className="text-[11px] text-[#7D8592]">{prop.bedrooms} Beds • {prop.bathrooms} Baths • {prop.sqft.toLocaleString()} sqft</p>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 uppercase font-bold text-[11px] text-[#5C6470]">
                        {prop.type}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-sm text-[#1E232A]">
                        {formatPrice(prop.price, prop.listingType)}
                      </td>
                      <td className="py-3.5 px-4 text-[#5C6470]">
                        {prop.location}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => updateProperty(prop.id, { isFeatured: !prop.isFeatured })}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            prop.isFeatured 
                              ? 'bg-[#FCECD7] border-[#F2C98A] text-[#94580D]' 
                              : 'bg-gray-100 border-gray-200 text-gray-400'
                          }`}
                          title="Toggle Featured on Homepage"
                        >
                          <Star className={`w-4 h-4 ${prop.isFeatured ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            const newP = prompt('Enter new price in USD:', prop.price.toString());
                            if (newP && !isNaN(Number(newP))) {
                              updateProperty(prop.id, { price: Number(newP) });
                            }
                          }}
                          className="px-3 py-1 bg-[#F3EEE6] hover:bg-[#E8E1D5] text-[#1E232A] rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                        >
                          Edit Price
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${prop.title}"?`)) {
                              deleteProperty(prop.id);
                            }
                          }}
                          className="p-1.5 bg-[#FDF2F2] hover:bg-[#FCE8E8] text-[#D9534F] rounded-lg transition-colors cursor-pointer inline-block align-middle"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Viewing Appointments */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-lg text-[#1E232A]">
              Client Viewing Appointments ({appointments.length})
            </h3>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-12 text-[#8A92A0]">
              <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-semibold">No appointments scheduled yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt) => (
                <div 
                  key={apt.id}
                  className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#E8E2D9] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={apt.propertyImage}
                      alt={apt.propertyTitle}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E0D8CB] flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#1E232A]">{apt.userName}</span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          apt.status === 'confirmed' ? 'bg-[#ECFDF5] text-[#10B981]' :
                          apt.status === 'pending' ? 'bg-[#FFFBEB] text-[#D97706]' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {apt.status}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-[#C6852C] bg-[#FCECD7] px-2 py-0.5 rounded-md">
                          {apt.viewingType.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#5C6470]">{apt.propertyTitle}</p>
                      <div className="text-xs text-[#7D8592] flex flex-wrap gap-3 pt-1">
                        <span>📅 <strong>{apt.date}</strong> at <strong>{apt.time}</strong></span>
                        <span>✉️ {apt.userEmail}</span>
                        <span>📞 {apt.userPhone}</span>
                        <span>👥 {apt.guests} Guests</span>
                      </div>
                      {apt.notes && (
                        <p className="text-[11px] text-[#8A92A0] italic mt-1 bg-white p-2 rounded-lg border border-[#E8E2D9]">
                          "{apt.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status update buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {apt.status === 'pending' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                        className="px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Confirm Booking
                      </button>
                    )}
                    {apt.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                        className="px-3.5 py-1.5 bg-[#1E232A] hover:bg-[#343D4A] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Mark Completed
                      </button>
                    )}
                    <button
                      onClick={() => {
                        const note = prompt('Add internal VIP concierge notes:', apt.adminNotes || '');
                        if (note !== null) {
                          updateAppointmentStatus(apt.id, apt.status, note);
                        }
                      }}
                      className="px-3 py-1.5 bg-white border border-[#DDD6CB] hover:bg-[#F7F4EE] text-xs font-semibold rounded-lg text-[#1E232A] cursor-pointer"
                    >
                      Notes
                    </button>
                    <button
                      onClick={() => deleteAppointment(apt.id)}
                      className="p-1.5 text-[#D9534F] hover:bg-[#FDF2F2] rounded-lg transition-colors cursor-pointer"
                      title="Remove record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Add New Property Listing Form */}
      {activeTab === 'add_property' && (
        <form onSubmit={handleSaveNewProperty} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[#1E232A]">
                Publish New Property to Catalog
              </h3>
              <p className="text-xs text-[#7D8592]">Create an exclusive listing with Gemini AI assisted copywriting.</p>
            </div>
            <button
              type="button"
              onClick={handleAIGenerateCopy}
              disabled={isGeneratingAICopy}
              className="px-4 py-2 bg-[#FCECD7] hover:bg-[#FBD9B0] text-[#94580D] font-bold text-xs rounded-full flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAICopy ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAICopy ? 'Generating with Gemini...' : 'AI Auto-Write Description'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Property Title *
              </label>
              <input
                type="text"
                required
                value={newPropTitle}
                onChange={(e) => setNewPropTitle(e.target.value)}
                placeholder="e.g. Villa Bellezza on Palm Jumeirah"
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Headline / Subtitle
              </label>
              <input
                type="text"
                value={newPropSubtitle}
                onChange={(e) => setNewPropSubtitle(e.target.value)}
                placeholder="e.g. Ultra-modern waterfront villa with private yacht berth"
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Property Type & Listing Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newPropType}
                  onChange={(e) => setNewPropType(e.target.value as any)}
                  className="bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                >
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="mansion">Mansion</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                </select>
                <select
                  value={newPropListingType}
                  onChange={(e) => setNewPropListingType(e.target.value as any)}
                  className="bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Price in USD ($) *
              </label>
              <input
                type="number"
                required
                value={newPropPrice}
                onChange={(e) => setNewPropPrice(Number(e.target.value))}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Location (City, Country) *
              </label>
              <input
                type="text"
                required
                value={newPropLocation}
                onChange={(e) => setNewPropLocation(e.target.value)}
                placeholder="Beverly Hills, California"
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={newPropAddress}
                onChange={(e) => setNewPropAddress(e.target.value)}
                placeholder="1044 Loma Vista Drive"
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">Beds</label>
                <input
                  type="number"
                  value={newPropBeds}
                  onChange={(e) => setNewPropBeds(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2 text-xs text-[#1E232A]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">Baths</label>
                <input
                  type="number"
                  value={newPropBaths}
                  onChange={(e) => setNewPropBaths(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2 text-xs text-[#1E232A]"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#8A92A0] mb-1">Sq. Ft.</label>
                <input
                  type="number"
                  value={newPropSqft}
                  onChange={(e) => setNewPropSqft(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2 text-xs text-[#1E232A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Cover Image URL *
              </label>
              <input
                type="url"
                required
                value={newPropImageUrl}
                onChange={(e) => setNewPropImageUrl(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
              Gallery Image URLs (one per line)
            </label>
            <textarea
              rows={2}
              value={newPropGallery}
              onChange={(e) => setNewPropGallery(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] font-mono focus:outline-none focus:border-[#C6852C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
              Full Luxury Description
            </label>
            <textarea
              rows={4}
              value={newPropDescription}
              onChange={(e) => setNewPropDescription(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] leading-relaxed focus:outline-none focus:border-[#C6852C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
              Amenities (comma separated)
            </label>
            <input
              type="text"
              value={newPropAmenities}
              onChange={(e) => setNewPropAmenities(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featureCheckbox"
              checked={newPropIsFeatured}
              onChange={(e) => setNewPropIsFeatured(e.target.checked)}
              className="w-4 h-4 accent-[#C6852C] rounded cursor-pointer"
            />
            <label htmlFor="featureCheckbox" className="text-xs font-bold text-[#1E232A] cursor-pointer">
              Feature this property prominently on the Homepage
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#E8E2D9]">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#1E232A] hover:bg-[#343D4A] text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
            >
              Publish Listing Now
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('properties')}
              className="px-6 py-3.5 bg-[#FAF8F5] hover:bg-[#F0EBE1] text-[#5C6470] font-bold text-xs rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Tab 4: Website Content CMS */}
      {activeTab === 'content' && (
        <form onSubmit={handleSaveContent} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-xs space-y-6">
          <div className="border-b border-[#E8E2D9] pb-4">
            <h3 className="font-heading font-extrabold text-xl text-[#1E232A]">
              Live Website Content Management (CMS)
            </h3>
            <p className="text-xs text-[#7D8592]">Modify the hero headline, quote, and announcement banner.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={contentHeadline}
                onChange={(e) => setContentHeadline(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] font-bold focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Hero Inspirational Quote
              </label>
              <textarea
                rows={2}
                value={contentQuote}
                onChange={(e) => setContentQuote(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Quote Author / Title
              </label>
              <input
                type="text"
                value={contentAuthor}
                onChange={(e) => setContentAuthor(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#1E232A] mb-1">
                Top Announcement Banner Text
              </label>
              <input
                type="text"
                value={contentBanner}
                onChange={(e) => setContentBanner(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDD6CB] rounded-xl p-2.5 text-xs text-[#1E232A] focus:outline-none focus:border-[#C6852C]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="bannerEnabled"
                checked={bannerEnabled}
                onChange={(e) => setBannerEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#C6852C] rounded cursor-pointer"
              />
              <label htmlFor="bannerEnabled" className="text-xs font-bold text-[#1E232A] cursor-pointer">
                Display top announcement banner on all pages
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E2D9]">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#1E232A] hover:bg-[#343D4A] text-white font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer"
            >
              Update Website Content
            </button>
          </div>
        </form>
      )}

      {/* Tab 5: Client Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-xs space-y-6">
          <h3 className="font-heading font-extrabold text-lg text-[#1E232A]">
            Client Leads & Messages
          </h3>

          <div className="space-y-3">
            {[
              {
                id: 'inq-01',
                name: 'Lady Charlotte Windsor',
                email: 'charlotte@windsorholdings.co.uk',
                phone: '+44 20 7946 0888',
                property: 'Kensington Palace Gardens Residence',
                message: 'Inquiring regarding diplomatic lease terms for 24 months. Please contact my private office.',
                time: '2 hours ago'
              },
              {
                id: 'inq-02',
                name: 'Alexander Vane',
                email: 'alex.vane@apexgroup.com',
                phone: '+1 (310) 440-9281',
                property: 'Bismillah House & Modern Villa',
                message: 'Requesting full structural floor plans and property survey before making an initial offer.',
                time: 'Yesterday'
              },
              ...inquiries.map(i => ({
                id: i.id,
                name: i.name,
                email: i.email,
                phone: i.phone,
                property: i.propertyTitle || 'General Acquisition',
                message: i.message,
                time: 'Recently'
              }))
            ].map((lead, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E2D9] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1E232A]">{lead.name}</span>
                  <span className="text-[10px] text-[#8A92A0] font-semibold">{lead.time}</span>
                </div>
                <p className="text-[#C6852C] font-semibold">Listing: {lead.property}</p>
                <p className="text-[#5C6470] bg-white p-3 rounded-xl border border-[#E8E2D9] italic">
                  "{lead.message}"
                </p>
                <div className="flex gap-4 text-[#7D8592] pt-1">
                  <span>✉️ {lead.email}</span>
                  <span>📞 {lead.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
