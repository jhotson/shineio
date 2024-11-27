import { useApi } from './useApi';
import { listingsApi, Listing, CreateListingData } from '../lib/api/listings';

export function useListings() {
  const { execute: getAllListings, ...getAllState } = useApi(listingsApi.getAll);
  const { execute: getUserListings, ...getUserState } = useApi(listingsApi.getUserListings);
  const { execute: getListing, ...getState } = useApi(listingsApi.getListing);
  const { execute: createListing, ...createState } = useApi(listingsApi.createListing);
  const { execute: updateListing, ...updateState } = useApi(listingsApi.updateListing);
  const { execute: deleteListing, ...deleteState } = useApi(listingsApi.deleteListing);

  return {
    // Get all listings
    listings: getAllState.data,
    loadingListings: getAllState.loading,
    listingsError: getAllState.error,
    fetchListings: getAllListings,

    // Get user listings
    userListings: getUserState.data,
    loadingUserListings: getUserState.loading,
    userListingsError: getUserState.error,
    fetchUserListings: getUserListings,

    // Get single listing
    listing: getState.data,
    loadingListing: getState.loading,
    listingError: getState.error,
    fetchListing: getListing,

    // Create listing
    creatingListing: createState.loading,
    createListingError: createState.error,
    createListing: (data: CreateListingData) => createListing(data),

    // Update listing
    updatingListing: updateState.loading,
    updateListingError: updateState.error,
    updateListing: (id: number, data: Partial<CreateListingData>) => updateListing(id, data),

    // Delete listing
    deletingListing: deleteState.loading,
    deleteListingError: deleteState.error,
    deleteListing,
  };
}