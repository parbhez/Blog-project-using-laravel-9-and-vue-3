@extends('welcome')

@section('content')
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Post</h1>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active"><a href="#">Dashboard</a></div>
                    <div class="breadcrumb-item"><a href="#">Components</a></div>
                    <div class="breadcrumb-item">Post</div>
                </div>
            </div>

            <div class="section-body">

                <div class="row">

                    <div class="col-12 col-sm-12 col-lg-12">
                        <div class="card">
                            <!-- <div class="card-header">
                                <h4>Post</h4>
                            </div> -->
                            <div class="card-body">
                                <ul class="nav nav-tabs" id="myTab2" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab2" data-toggle="tab" href="#view-post"
                                            role="tab" aria-controls="home" aria-selected="true">View</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" id="profile-tab2" data-toggle="tab" href="#add-post"
                                            role="tab" aria-controls="profile" aria-selected="false">Add</a>
                                    </li>

                                </ul>
                                <div class="tab-content tab-bordered" id="myTab3Content">

                                    <div class="tab-pane fade show active" id="view-post" role="tabpanel"
                                        aria-labelledby="home-tab2">


                                        <view-post-component></view-post-component>
                                    </div>



                                    <div class="tab-pane fade" id="add-post" role="tabpanel"
                                        aria-labelledby="profile-tab2">
                                        <create-post-component :categories='@json($categories)'>
                                        </create-post-component>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    </div>
@endsection


