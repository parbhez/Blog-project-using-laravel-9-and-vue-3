@extends('welcome')
@section('content')
    <div class="main-content">
        <section class="section">
            <div class="section-header">
                <h1>Categories</h1>
                <div class="section-header-button">
                    <a href="features-post-create.html" class="btn btn-primary">Add New</a>
                </div>
                <div class="section-header-breadcrumb">
                    <div class="breadcrumb-item active"><a href="#">Dashboard</a></div>
                    <div class="breadcrumb-item"><a href="#">Posts</a></div>
                    <div class="breadcrumb-item">All Category</div>
                </div>
            </div>

           <create-category-component :categories="{{$categories}}"></create-category-component>
        </section>
    </div>
@endsection

