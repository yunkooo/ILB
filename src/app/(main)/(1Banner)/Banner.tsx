import BannerItem from './BannerItem';
import MultiCarousel from './Carousel';

const banner = ['banner_1', 'banner_2', 'banner_3'];

export default function Banner() {
    return (
        <article>
            <MultiCarousel>
                {banner.map((item, i) => (
                    <BannerItem img={item} key={i} />
                ))}
            </MultiCarousel>
        </article>
    );
}
