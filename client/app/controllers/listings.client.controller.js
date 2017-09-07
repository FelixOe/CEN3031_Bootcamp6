angular.module('listings').controller('ListingsController', ['$scope', '$location', '$stateParams', '$state', 'Listings',
    function ($scope, $location, $stateParams, $state, Listings) {
        $scope.find = function () {
            /* set loader*/
            $scope.loading = true;

            /* Get all the listings, then bind it to the scope */
            Listings.getAll().then(function (response) {
                $scope.loading = false; //remove loader
                $scope.listings = response.data;
            }, function (error) {
                $scope.loading = false;
                $scope.error = 'Unable to retrieve listings!\n' + error;
            });
        };

        $scope.findOne = function () {
            $scope.loading = true;

            var id = $stateParams.listingId;

            Listings.read(id)
                .then(function (response) {
                    $scope.listing = response.data;
                    $scope.loading = false;
                }, function (error) {
                    $scope.error = 'Unable to retrieve listing with id "' + id + '"\n' + error;
                    $scope.loading = false;
                });
        };

        $scope.create = function (isValid) {
            $scope.error = null;

            /*
             Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
             */
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'articleForm');

                return false;
            }

            /* Create the listing object */
            var listing = {
                name: $scope.name,
                code: $scope.code,
                address: $scope.address
            };

            /* Save the article using the Listings factory */
            Listings.create(listing)
                .then(function (response) {
                    //if the object is successfully saved redirect back to the list page
                    $state.go('listings.list', {successMessage: 'Listing successfully created!'});
                }, function (error) {
                    //otherwise display the error
                    $scope.error = 'Unable to save listing!\n' + error;
                });
        };

        $scope.update = function (isValid) {
            /*
             Fill in this function that should update a listing if the form is valid. Once the update has
             successfully finished, navigate back to the 'listing.list' state using $state.go(). If an error
             occurs, pass it to $scope.error.
             */
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'articleForm');

                return false;
            }

            var listing = {
                name: $scope.listing.name,
                code: $scope.listing.code,
                address: $scope.listing.address
            };

            var id = $stateParams.listingId;

            /* Save the article using the Listings factory */
            Listings.update(id, listing)
                .then(function (response) {
                    //if the object is successfully saved redirect back to the list page
                    $state.go('listings.list', {successMessage: 'Listing successfully updated!'});
                }, function (error) {
                    //otherwise display the error
                    $scope.error = 'Unable to save listing!\n' + error;
                });
        };

        $scope.remove = function () {
            /*
             Implement the remove function. If the removal is successful, navigate back to 'listing.list'. Otherwise,
             display the error.
             */
            $scope.loading = true;

            var id = $stateParams.listingId;

            Listings.delete(id)
                .then(function (response) {
                    $scope.loading = false;
                    $location.path('/listings');
                    $scope.$apply();
                }, function (error) {
                    $scope.error = 'Unable to delete listing with id "' + id + '"\n' + error;
                    $scope.loading = false;
                });
        };

        /* Bind the success message to the scope if it exists as part of the current state */
        if ($stateParams.successMessage) {
            $scope.success = $stateParams.successMessage;
        }

        /* Map properties */
        $scope.map = {
            center: {
                latitude: 29.65163059999999,
                longitude: -82.3410518
            },
            zoom: 14,
            options: {labelContent: 'label'}
        }

        $scope.onMarkerClicked = function (m) {
            //this.windowOptions = !this.windowOptions;
            console.log('Marker was clicked');
            console.log(m);
        };

        $scope.closeClick = function () {
            this.window = false;
        };


        $scope.loadMap = function () {
            var markers = [];

            Listings.getAll().then(function (response) {
                $scope.loading = false; //remove loader
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].coordinates != undefined) {
                        var ret = {
                            id: i,
                            coordinates: {
                                latitude: response.data[i].coordinates.latitude,
                                longitude: response.data[i].coordinates.longitude
                            },
                            label: response.data[i].code + ' - ' + response.data[i].name
                        };

                        markers.push(ret);
                    }
                }
                $scope.mapMarkers = markers;
            }, function (error) {
                $scope.loading = false;
                $scope.error = 'Unable to retrieve listings!\n' + error;
            });
        };
    }
]);