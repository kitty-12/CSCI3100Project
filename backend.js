var Admin={
    id: 'admin',
    password:'123456qwe',
    delete: function(post_id){
        //Database operation
    },
    ban: function(){
        //Database operation
    },
    announce: function(annoucement,user_id){
        alert(announcement);
    },
    login: function(id,password){
        if (this.id===id&&this.password===password){
            return 1;
        }
        else return 0;
    },
    logout: function(){
        //return to homepage
    }
}

function createAdmin(id,password){
    var admin=Object.create(Admin);
    admin.id=id;
    admin.password=password;
}

var Post={
    author: 'user',
    id: 'id',
    type: 0,//0 no image, 1 image
    status: 0, //0 draft, 1 sent.
    title: 'title',
    text: 'text',
    image: image,//image?
    tag: [],
    postTime: Date,
    comment:[],
    likes:0,
    sendNotification: function(user_id){

    }
}

function createPost(author,id,type,status,title,text,image,tag,){
    var post=Object.create(Post);
    post.author=author;
    post.id=id;
    post.type=type;
    post.status=status;
    post.title=title;
    post.text=text;
    post.image=image;
    post.tag=tag;
    post.sendNotification();
}

var Comment={
    author: 'id',
    postTime: Date,
    content:'content',
}

