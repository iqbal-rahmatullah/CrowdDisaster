import { convertToIndonesianDate } from '@/lib/utils/convertTime';
import { DisasterPost } from '@/types/disaster-post';
import { Link } from '@inertiajs/react';
import L from 'leaflet';
import { HiCalendar, HiLocationMarker, HiUser } from 'react-icons/hi';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '../ui/button';

export const MarkerDisasterPost = ({ post }: { post: DisasterPost }) => {
    return (
        <Marker
            key={post.id}
            position={[parseFloat(post.latitude), parseFloat(post.longitude)]}
            icon={L.icon({
                iconUrl: '/img/logo_marker/disaster_post.png',
                iconSize: [40, 40],
                popupAnchor: [0, -20],
            })}
        >
            <Popup>
                <div className="relative mb-4 h-[180px] w-full overflow-hidden rounded-lg">
                    <img
                        src={post.disaster_posts_proof != null ? `/storage/${post.disaster_posts_proof[0].file_path}` : '/img/placeholder.png'}
                        className="h-full w-full object-cover"
                        alt="Gambar Posko Bencana"
                    />
                </div>

                <h2 className="text-lg font-bold">{post.title}</h2>
                <p>{post.description}</p>
                <div className="flex items-center gap-x-2">
                    <HiLocationMarker className="text-primary flex-shrink-0 text-lg" />
                    <p className="text-xs font-medium">{post.address}</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <HiCalendar className="text-primary flex-shrink-0 text-lg" />
                    <p className="text-xs font-medium">{convertToIndonesianDate(new Date(post.created_at).toLocaleString())}</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <HiUser className="text-primary flex-shrink-0 text-lg" />
                    <p className="text-xs font-medium">
                        {post.disaster_posts_refugees.length} / {post.quota} Orang
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link href={`/disaster-posts/${post.id}`} className="w-full">
                        <Button>Lihat Selengkapnya</Button>
                    </Link>
                </div>
            </Popup>
        </Marker>
    );
};
